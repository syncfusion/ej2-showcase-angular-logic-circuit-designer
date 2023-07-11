import { Connector, ConnectorModel, Diagram,DiagramTools,NodeModel, SelectorModel, Node, NodeConstraints, ConnectorConstraints, IHistoryChangeArgs, SnapConstraints, DiagramModel, Gradient, GradientModel, GradientType, DiagramGradient, PointModel, HorizontalAlignment, VerticalAlignment, TextAlign, DiagramBeforeMenuOpenEventArgs, BpmnShapeModel, BpmnFlow, TextStyleModel } from "@syncfusion/ej2-diagrams";
import { ClickEventArgs, ItemModel, MenuModel, OpenCloseMenuEventArgs, Toolbar } from "@syncfusion/ej2-angular-navigations";
import { BeforeOpenCloseMenuEventArgs, MenuEventArgs } from "@syncfusion/ej2-angular-splitbuttons";
import { formatUnit, createElement, closest } from '@syncfusion/ej2-base';
import { AppComponent } from "src/app/app.component";
import { SelectorViewModel } from "./selector";

export class PaperSize {
    public pageWidth: number|any;
    public pageHeight: number|any;
}

export class UtilityMethods {
    public static isOpen: boolean;
    public static selectedItem: SelectorViewModel;
    public arrangeMenuBeforeClose(args: BeforeOpenCloseMenuEventArgs): void {
        if (args.event && closest(args.event.target as Element, '.e-dropdown-btn') !== null) {
            args.cancel = true;
        }
        if (!args.element) {
            args.cancel = true;
        }
    };
    public arrangeMenuBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
        (args.element.children[0] as HTMLElement).style.display = 'block';
        if (args.event && closest(args.event.target as Element, '.e-dropdown-btn') !== null) {
            args.cancel = true;
        }
    };
    public editContextMenuOpen(args: OpenCloseMenuEventArgs){
        if (args.element.classList.contains('e-menu-parent')) {
            let popup: HTMLElement = document.querySelector('#btnEditMenu-popup') as HTMLElement;
            args.element.style.left = formatUnit(parseInt(args.element.style.left, 10) - parseInt(popup.style.left, 10));
            args.element.style.top = formatUnit(parseInt(args.element.style.top, 10) - parseInt(popup.style.top, 10));
        }
    }
    public designContextMenuOpen(args: OpenCloseMenuEventArgs){
        if (args.element.classList.contains('e-menu-parent')) {
            var popup = document.querySelector('#btnDesignMenu-popup') as HTMLElement;
            args.element.style.left = formatUnit(parseInt(args.element.style.left, 10) - parseInt(popup.style.left, 10));
            args.element.style.top = formatUnit(parseInt(args.element.style.top, 10) - parseInt(popup.style.top, 10));
        }
    };
    public getShortCutKey(menuItem: string): string {
        let shortCutKey: string = navigator.platform.indexOf('Mac') > -1 ? 'Cmd' : 'Ctrl';
        switch (menuItem) {
            case 'New':
                shortCutKey = 'Shift' + '+N';
                break;
            case 'Open':
                shortCutKey = shortCutKey + '+O';
                break;
            case 'Save':
                shortCutKey = shortCutKey + '+S';
                break;
            case 'Undo':
                shortCutKey = shortCutKey + '+Z';
                break;
            case 'Redo':
                shortCutKey = shortCutKey + '+Y';
                break;
            case 'Cut':
                shortCutKey = shortCutKey + '+X';
                break;
            case 'Copy':
                shortCutKey = shortCutKey + '+C';
                break;
            case 'Paste':
                shortCutKey = shortCutKey + '+V';
                break;
            case 'Delete':
                shortCutKey = 'Delete';
                break;
            case 'Select All':
                shortCutKey = shortCutKey + '+A';
                break;
            case 'Zoom In':
                shortCutKey = shortCutKey + '++';
                break;
            case 'Zoom Out':
                shortCutKey = shortCutKey + '+-';
                break;
            default:
                shortCutKey = '';
                break;
        }
        return shortCutKey;
      }
    public enableToolbarItems(selectedItems:Object[]): void{
        let toolbarContainer: HTMLDivElement = document.getElementsByClassName('db-toolbar-container')[0] as HTMLDivElement;
        let toolbarClassName: string = 'db-toolbar-container';
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
                if ((selectedItems[0] as Node).children) {
                    if ((selectedItems[0] as Node).children.length > 2) {
                        toolbarContainer.className = toolbarContainer.className + ' db-select db-double db-multiple db-node db-group';
                    } else {
                        toolbarContainer.className = toolbarContainer.className + ' db-select db-double db-node db-group';
                    }
                } else {
                    toolbarContainer.className = toolbarContainer.className + ' db-select db-node';
                }
            }
        } else if (selectedItems.length === 2) {
            toolbarContainer.className = toolbarContainer.className + ' db-select db-double';
        } else if (selectedItems.length > 2) {
            toolbarContainer.className = toolbarContainer.className + ' db-select db-double db-multiple';
        }
        if (selectedItems.length > 1) {
            let isNodeExist: boolean = false;
            for (let i: number = 0; i < selectedItems.length; i++) {
                if (selectedItems[i] instanceof Node) {
                    toolbarContainer.className = toolbarContainer.className + ' db-select db-node';
                    break;
                }
            }
        }
    };
    public zoomChange(args:ClickEventArgs){
        let diagram = (document.getElementById('diagram') as any).ej2_instances[0];
        var zoomCurrentValue = (document.getElementById("btnZoomIncrement") as any).ej2_instances[0];
        var currentZoom = diagram.scrollSettings.currentZoom;
        var zoom: any = {};
        switch (args.item.text) {
            case 'Zoom In':
                diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
                zoomCurrentValue.content = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
                break;
            case 'Zoom Out':
                diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
                zoomCurrentValue.content = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
                break;
            case 'Zoom to Fit':
                diagram.fitToPage({ mode: 'Page', region: 'Content'});
                zoomCurrentValue.content = diagram.scrollSettings.currentZoom;
                break;
            case 'Zoom to 50%':
                zoom.zoomFactor = (0.5 / currentZoom) - 1;
                diagram.zoomTo(zoom);
                break;
            case 'Zoom to 100%':
                zoom.zoomFactor = (1 / currentZoom) - 1;
                diagram.zoomTo(zoom);
                break;
            case 'Zoom to 200%':
                zoom.zoomFactor = (2 / currentZoom) - 1;
                diagram.zoomTo(zoom);
                break;
        }
        zoomCurrentValue.content = Math.round(diagram.scrollSettings.currentZoom*100) + ' %';  
    };
    public download(data: string, filename: string): void {
        let dataStr: string = data;
        if ((window.navigator as any).msSaveBlob) {
            let blob: Blob = new Blob([dataStr], { type: 'data:text/json;charset=utf-8,' });
            (window.navigator as any).msSaveOrOpenBlob(blob, filename + '.json');
        } else {
            dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(dataStr);
            let a: HTMLAnchorElement = document.createElement('a');
            a.href = dataStr;
            a.download = filename + '.json';
            document.body.appendChild(a);
            a.click();
        }
    };
    public getPaperSize(paperName:string){
        let paperSize: PaperSize = new PaperSize();
        switch (paperName) {
            case 'Letter':
                paperSize.pageWidth = 816;
                paperSize.pageHeight = 1056;
                break;
            case 'Legal':
                paperSize.pageWidth = 816;
                paperSize.pageHeight = 1344;
                break;
            case 'Tabloid':
                paperSize.pageWidth = 1056;
                paperSize.pageHeight = 1632;
                break;
            case 'A3':
                paperSize.pageWidth = 1122;
                paperSize.pageHeight = 1587;
                break;
            case 'A4':
                paperSize.pageWidth = 793;
                paperSize.pageHeight = 1122;
                break;
            case 'A5':
                paperSize.pageWidth = 559;
                paperSize.pageHeight = 793;
                break;
            case 'A6':
                paperSize.pageWidth = 396;
                paperSize.pageHeight = 559;
                break;
        }
        return paperSize;
    };
    public updateSelection(item:any){
        for(let i:number=0;i<item.parentObj.items.length;i++)
        {
            if(item.text === item.parentObj.items[i].text){
                item.parentObj.items[i].iconCss = 'sf-icon-check-tick';
            }
            else{
                item.parentObj.items[i].iconCss = '';
            }
        }
    };
    public fileName(){
        return (document.getElementById('diagramName') as any).innerHTML;
    }
}