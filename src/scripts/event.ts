import { AnnotationAlignment, BpmnActivity, BpmnBoundary, BpmnDataObjects, BpmnEvents, BpmnFlow, BpmnGateway, BpmnGateways, BpmnLoops, BpmnShapeModel, BpmnTasks, BpmnTriggers, Connector, ConnectorModel, ContextMenuItemModel, Diagram, DiagramBeforeMenuOpenEventArgs, HorizontalAlignment, IDragEnterEventArgs, IEndChangeEventArgs, IHistoryChangeArgs, IRotationEventArgs, ISelectionChangeEventArgs, ISizeChangeEventArgs, NodeModel,  PathAnnotationModel,  SelectorModel,  ShapeAnnotationModel, TextAlign, TextStyleModel, UserHandleEventsArgs, UserHandleModel, VerticalAlignment } from "@syncfusion/ej2-angular-diagrams";
import { PathAnnotation,ShapeAnnotation ,SelectorConstraints} from '@syncfusion/ej2-diagrams'
import { AppComponent } from "src/app/app.component";
import {  SelectorViewModel } from "./selector";
import { UtilityMethods } from "./utilitymethods";
import { ChangeArgs as ButtonChangeArgs , ChangeEventArgs as CheckBoxChangeEventArgs,} from '@syncfusion/ej2-buttons'
import { ChangeEventArgs as NumericChangeEventArgs} from '@syncfusion/ej2-inputs';
import { ColorPickerEventArgs } from "@syncfusion/ej2-angular-inputs";
import { DropDownListComponent } from "@syncfusion/ej2-angular-dropdowns";
import { ChangeEventArgs as DropDownChangeEventArgs } from "@syncfusion/ej2-dropdowns"
import { ClickEventArgs as ToolbarClickEventArgs } from "@syncfusion/ej2-navigations"
import { MenuEventArgs } from "@syncfusion/ej2-angular-navigations";


export class DiagramClientSideEvents {
    
    private selectedItem: SelectorViewModel;
    constructor(selectedItem: SelectorViewModel) {
        this.selectedItem = selectedItem;
    }
    public paperListChange(args:any){
        let diagram = this.selectedItem.diagram;
        var value = args.value || args.item.value;
        var paperSize = this.selectedItem.utilityMethods.getPaperSize(value);
        var pageWidth = paperSize.pageWidth;
        var pageHeight = paperSize.pageHeight;
        if (pageWidth && pageHeight) {
            if (diagram.pageSettings.orientation === 'Portrait') {
                if (pageWidth > pageHeight) {
                    var temp = pageWidth;
                    pageWidth = pageHeight;
                    pageHeight = temp;
                }
            }
            else {
                if (pageHeight > pageWidth) {
                    var temp = pageHeight;
                    pageHeight = pageWidth;
                    pageWidth = temp;
                }
            }
            diagram.pageSettings.width = pageWidth;
            diagram.pageSettings.height = pageHeight;
        }
        else{
            diagram.pageSettings.width = 1460;
            diagram.pageSettings.height = 600;
        }
        let designContextMenu = (document.getElementById('designContextMenu') as any).ej2_instances[0];
        this.updatePaperSelection(designContextMenu.items[1],args.value);
        diagram.dataBind();
    };
    public updatePaperSelection(items:ContextMenuItemModel,value:string){
        for(let i:number=0;i<(items as any).items.length;i++)
        {
         if(value === ((items as any).items[i] as any).value){
            (items as any).items[i].iconCss = 'sf-icon-check-tick';
         }
         else{
            (items as any).items[i].iconCss = '';
         }
        }
    };
    public selectionChange(args: ISelectionChangeEventArgs): void{
        let diagram = this.selectedItem.diagram;
        if (args.state === 'Changed') {
            let toolbarEditor = (document.getElementById("toolbarEditor") as any).ej2_instances[0];
                let selectedItems :any= this.selectedItem.diagram.selectedItems.nodes;
                selectedItems = selectedItems.concat((this.selectedItem.diagram as any).selectedItems.connectors);
                this.enableToolbarItems(selectedItems);
                if(args.newValue.length>0 && args.newValue[0] instanceof Connector){
                    diagram.selectedItems = { constraints: SelectorConstraints.All };
                    toolbarEditor.hideItem(6,true);
                }
                else{
                    if((diagram.selectedItems as any).nodes.length > 0 &&
                         (diagram.selectedItems as any).nodes[0].id.indexOf('Clock') != -1)
                    {
                        toolbarEditor.hideItem(6,false);
                    }
                    else
                    {
                        toolbarEditor.hideItem(6,true);
                    }
                diagram.selectedItems = { constraints: SelectorConstraints.All & ~SelectorConstraints.Rotate & ~SelectorConstraints.ResizeAll };
                }
        }
    }
    public enableToolbarItems(selectedItems:any) {
        const toolbarContainer = document.getElementsByClassName('db-toolbar-container')[0];
        let toolbarClassName = 'db-toolbar-container';
        if (toolbarContainer.classList.contains('db-undo')) {
            toolbarClassName += ' db-undo';
        }
        if (toolbarContainer.classList.contains('db-redo')) {
            toolbarClassName += ' db-redo';
        }
        toolbarContainer.className = toolbarClassName;
        if (selectedItems.length === 1) {
            toolbarContainer.className = toolbarContainer.className + ' db-select';
            if (selectedItems[0] instanceof Node) {
                if ((selectedItems[0] as any).children) {
                    if ((selectedItems[0] as any).children.length > 2) {
                        toolbarContainer.className = toolbarContainer.className + ' db-select db-double db-multiple db-node db-group';
                    }
                    else {
                        toolbarContainer.className = toolbarContainer.className + ' db-select db-double db-node db-group';
                    }
                }
                else {
                    toolbarContainer.className = toolbarContainer.className + ' db-select db-node';
                }
            }
        }
        else if (selectedItems.length === 2) {
            toolbarContainer.className = toolbarContainer.className + ' db-select db-double';
        }
        else if (selectedItems.length > 2) {
            toolbarContainer.className = toolbarContainer.className + ' db-select db-double db-multiple';
        }
        if (selectedItems.length > 1) {
            // let isNodeExist: boolean = false;
            for (const item of selectedItems) {
                if (item instanceof Node) {
                    toolbarContainer.className = toolbarContainer.className + ' db-select db-node';
                    break;
                }
            }
        }
    }
     public historyChange(){
        let diagram = this.selectedItem.diagram;
        let toolbarContainer: HTMLDivElement = document.getElementsByClassName('db-toolbar-container')[0] as HTMLDivElement;
        toolbarContainer.classList.remove('db-undo');
        toolbarContainer.classList.remove('db-redo');
        if ((diagram as any).historyManager.undoStack.length > 0) {
            toolbarContainer.classList.add('db-undo');
        }
        if ((diagram as any).historyManager.redoStack.length > 0) {
            toolbarContainer.classList.add('db-redo');
        }
    };
};
  

