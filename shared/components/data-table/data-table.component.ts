import {Component, OnInit, OnChanges, Input, Output, EventEmitter,AfterViewInit, OnDestroy, Inject, ViewChild} from '@angular/core';
import {FormGroup,FormBuilder,Validators,FormControl} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import * as _ from 'lodash';

declare var $: any;
declare var jquery: any;
import 'datatables.net';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss']
})

export class DataTableComponent implements OnInit,AfterViewInit {

  @Input()
  data: any ;
  counter = 0;
  @Output()
  filterValues: EventEmitter<any> = new EventEmitter() ;


  tableWidget: any;
  // removeData: Array;

  constructor(public toastr: ToastsManager,private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.displayDataTable();
  }

  ngAfterViewInit() {
    console.log('checking')
  }


  private displayDataTable(): void {
    let table: any = $('#gridtable');
    var thse = this;
    var defs = [],hKey =[];
    const option = this.data.options;
    const headers = this.data.headers;
    headers.forEach(function (data, index) {
      var def = {};
      var opt = option;
      def['targets'] = index;
      def['orderable'] = data.isFilterRequired;
      def['searchable']=true,
      def['className']= !data.isFilterRequired?'dt-not-search':'dt-body-left';
      if(data.isCheckbox){
        def['render']= function (dat, type, full, meta){
              return '<span>'+$('<div/>').text(dat).html()+'</span><input type="checkbox" id="'+data.data+'" name="id[]" value="'
                 + $('<div/>').text(dat).html() + '"><i class="fa fa-square-o" aria-hidden="true"></i>';
               }
               setTimeout(function(){
                  table.find('thead th:eq(0)').addClass('selectAll').append('<span></span><input type="checkbox"><i class="fa fa-square-o" aria-hidden="true"></i><label</lable>')
                },100);
      }
      // debugger;
      if(opt.edit && data.editButton){
        def['render']= function (dat, type, full, meta){
              return '<span></span>'+$('<div/>').text(dat).html() +'<i class="fa fa-pencil" aria-hidden="true"></i>';
               }
      }
      if(data.onchange){
        def['render']= function (dat, type, full, meta){
          var checking = $('<div/>').text(dat).html()=="true";
          var chnageChk = checking?'checked':'';
          var act = checking? 'Active':'Inactive';
          var actClass = checking? 'a-tive':'in-active';
              return '<label class="switch"><input type="checkbox" '+chnageChk+' value="'+full[data.ref]+'"><sp class="slider round '+actClass+'">'+act+'</sp></label>';
        }
      }
      hKey.push(data.data);
      defs.push(def);
    }, this);

    let buttns = [];
    if(option.searchCol){
      buttns.push({
        extend: '',
        text: '<i class="fa fa-filter fa-Ifilter" aria-hidden="true"></i>'
      })
    }
    if(option.colVisibility){
      buttns.push({
         extend: 'colvis',
         text: '<i class="fa fa-cog fa-Ivisible" aria-hidden="true"></i>',
         postfixButtons: ['colvisRestore'],
      })
    }
    if(option.download){
      buttns.push({
          extend: 'csv',
          text: '<i class="fa fa-download fa-Idown" aria-hidden="true"></i>',
          exportOptions: {
            columns: headers[0].isCheckbox||headers[0].data=="id"?':not(:first-child)':'',
          }
        });
    }


    //Dom values options
    let domm = 'Brtipl';
    if(option.searchGlobal){
      domm = 'fBrtipl'
    }

    this.tableWidget = table.DataTable({
      "columns": headers,
      'columnDefs': defs,
      "dom": domm,
      "paging":   option.pagination==undefined ? true:option.pagination,
      "ordering": option.ordering==undefined ? true:option.ordering,
      "info":     option.tableInfo==undefined ? false:option.tableInfo,
      'select':  option.rowSelection==undefined ? false:option.rowSelection,
      'order': [],
      "buttons": buttns,
      // initComplete: function () {
      //     this.api().columns([3]).every( function () {
      //         var column = this;
      //         console.log(column);
      //         // if(column[0]==3){
      //         var select = $('<select><option value="">Select</option></select>')
      //             .appendTo( $(column.footer()).empty() )
      //             .on( 'change', function () {
      //                 var val = $.fn.dataTable.util.escapeRegex(
      //                     $(this).val()
      //                 );
      //
      //                 column
      //                     .search( val ? '^'+val+'$' : '', true, false )
      //                     .draw();
      //             } );
      //
      //         column.data().unique().sort().each( function ( d, j ) {
      //             select.append( '<option value="'+d+'">'+d+'</option>' )
      //         } );
      //       // }
      //     } );
      // }
    });

    //Insert the Row value from Data
    this.dataDraw();

    var divv = "";
    divv += '<div class="temp-btn">';
    divv += '<button type="button" value="cancel" class="btn-default btn-cancel" >CANCEL</button>';
    divv += '<button type="submit" value="Reset" class="btn-default btn-save">SAVE</button>';
    divv += '</div>';

    //Create column search element
    var tableee= table.find("thead tr:eq(0)").html();
    table.find('thead').after("<tfoot><tr>"+tableee+"</tr></tfoot>");
    table.find('tfoot th').each( function (i) {
        var title = $(this).text();
        if(!headers[i]["isCheckbox"]){
          $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
        }
    });

    //Adding New Row
    console.log("Add row")
    if(option.addRow && this.data.rowAdd){
      var tabAdd = table.find("tbody tr:eq(0)").clone();
      table.find('tbody').prepend(tabAdd);
      table.find('tbody tr').eq(0).addClass('newRow');
      tabAdd.find('td').each( function (i,n) {
          var title = $(this).text();
          if(!headers[i]["isCheckbox"]){
            $(this).html('<input type="text" />' );
            if(i==($(this).parent().children().length-1)){
              $(this).append(divv).find('.btn-save').removeClass('btn-save').addClass('btn-save-newrow');
              $(this).find('.btn-cancel').removeClass('btn-cancel').addClass('btn-cancel-newrow');
            }
          }
      });
    }

    // Apply the search
    this.tableWidget.columns().every( function () {
        var that = this;
        $( 'tfoot input').on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
                thse.tableWidget.search( this.value ).draw();
            }
        } );
    } );

    //Column search display
    $(".dt-buttons").on("click",".fa-Ifilter",function(){
        // table.find("tfoot").slideToggle();
      if(!table.find("tfoot").hasClass('active')){
        table.find("tfoot").addClass('active');
      }else{
        table.find("tfoot").removeClass('active');
        thse.tableWidget.search("").draw();
      }
    });

    //On change Functionality
    table.on("change", ".switch input", function(e) {
      if($(this).prop('checked')){
        $(this).next('.slider').removeClass('in-active').addClass('a-tive').text('Active');
      }else{
        $(this).next('.slider').removeClass('a-tive').addClass('in-active').text('Inactive');
      }
      thse.activeInactive(e);
    })

    //Edit Functions
    var tre = [];
    table.on('mousedown.edit', "i.fa.fa-pencil", function(e) {
      $('#addRow').prop('disabled', true);
      $(".newRow").remove();
      var $row = $(this).closest("tr").off("mousedown");
      var id = $row["0"].id;
      $($row).find('td').eq(0).find('input').prop('checked',false);
        tre.push($(this).parents('tr').index());
        if(tre.length>1) {
          var revet = $(this).parents('tbody').find('tr').eq(tre[0]);
          var $tds = revet.find("td").not(':first');
          $.each($tds, function(i, el) {
            var txt = $(this).find("input")["0"].attributes['data-index'].nodeValue;
            $(this).html(txt);
            if(headers[i+1].editButton)
            {
              $(this).html(txt).append("<i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>");
            }
          });
          tre.shift();
        }
      var $tds = $row.find("td").not(':first');
      $.each($tds, function(i, el) {
        var txt = $(this).text();
        $(this).html("").append("<div class='form-group'><input type='text' id='"+hKey[i+1]+"' data-index=\""+txt+"\" value=\""+txt+"\" class=\"form-fields ng-invalid\"><div  class=\"valid-msg\" > Required Field </div></div>");
        if(i=== ($tds.length - 1)){
          $(this).append(divv);
        }
      });

    });

    //Cancel on Edit Action
    table.on('mousedown.cancel', "button.btn-default.btn-cancel", function(e) {
    $('#addRow').prop('disabled', false);
      $(this).removeClass().addClass("fa fa-pencil");
      var $row = $(this).closest("tr");
      var $tds = $row.find("td").not(':first');
      $.each($tds, function(i, el) {
        var txt = $(this).find("input")["0"].attributes['data-index'].nodeValue;
        $(this).html(txt);
        if(headers[i+1].editButton)
        {
          $(this).html(txt).append("<i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>");
        }
      });
      tre.shift();
    });

    //Save the Edit Row
    table.on('mousedown.save', "button.btn-default.btn-save", function(e) {
      var $row = $(this).closest("tr");
      var $tds = $row.find("td");
      var ps={};
      _.forEach(headers,(v,i)=>{
        var txt ="",oldtxt="";
        $.each($tds, function(i, el){
          txt = $(this).find("input").val();
          oldtxt = $(this).find("input").attr('data-index');
          if($(this).find("input").attr('id') === v.data){
            ps[v.data] = txt;
          }
        });
      });
      if(_.size(ps)>1){
        $('#addRow').prop('disabled', false);
        var k = [];
        $.each($tds,function(i, el){
           var inp = $(this).find('input').val();
           if(inp==""){
             $(this).find('input').addClass('ng-touched ng-invalid').removeClass('ng-valid ng-dirty');
             k.push(false);
           }else{
              $(this).find('input').removeClass('ng-invalid').addClass('ng-valid ng-dirty');
              k.push(true)
           }
       });
         if(!_.includes(k,false)){
               thse.editRow(ps);
         }
       }
       else{
         thse.toastr.error('ERROR!', "Nothing to changed");
       }
    });

    //Select Single Row to be Deleted
    var arrpus = [];
    table.on( 'change', 'tr td:first-of-type input', function () {
        if ( !$(this).prop('checked') ) {
            var itemtoRemove= $(this).val();
            arrpus = _.remove(arrpus,(v)=>{return v.id!==itemtoRemove});
            table.find('tr th:first-of-type input').prop('checked',false);
        } else {
            arrpus.push(_.filter(thse.data.result,['id',$(this).val()])[0]);
        }
        thse.removeData(arrpus);
    });

    //Select ALL
    table.on( 'change', 'tr th:first-of-type input', function () {
        if( !$(this).prop('checked') ) {
          $.each(table.find("tbody tr"),function(){
            $(this).find("td:eq(0) input").prop('checked',false);
            var itemtoRemove = $(this).find("td:eq(0) input").val();
            arrpus = _.remove(arrpus,(v)=>{return v.id!==itemtoRemove});
          });
        }else{
          $.each(table.find("tbody tr"),function(){
            $(this).find("td:eq(0) input").prop('checked',true);
            var val = $(this).find("td:eq(0) input").val();
            arrpus.push(_.filter(thse.data.result,['id',val])[0]);
          });
        }
        thse.removeData(arrpus);
    });

    table.on('click','.btn-cancel-newrow',function(){
      $(this).parents('.newRow').remove();
    });

  }

  activeInactive(ev){
    var inputChange = {"id":ev.target.value, "status":ev.target.checked, "functionRef":"onchange"};
    this.filterValues.emit(inputChange);
  }

  dataDraw(){
    if(this.data){
      // console.log(this.data)
      var thse = this;
      this.data.result.forEach(function (data, index) {
          thse.tableWidget.row.add(data);
      }, this);
        this.tableWidget.draw();
    }
  }

  editRow(v){
    var inputChange = {"edit":v,"functionRef":"editRow"};
    this.filterValues.emit(inputChange);
  }

  removeData(ar){
    var inputChange = {"remove":ar,"functionRef":"removeRow"};
    this.filterValues.emit(inputChange);
  }

}
