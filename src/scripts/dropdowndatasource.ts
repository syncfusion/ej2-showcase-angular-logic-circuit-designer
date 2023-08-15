import { ItemModel } from '@syncfusion/ej2-splitbuttons';
import { MenuItemModel, } from '@syncfusion/ej2-navigations';
import { ContextMenuItemModel } from '@syncfusion/ej2-angular-diagrams';
import { DropDownButton } from '@syncfusion/ej2-angular-splitbuttons';

export class DropDownDataSources {

    public getFileMenuItems: ItemModel[] = [
        { text: 'New' ,iconCss:'sf-icon-new'}, { text: 'Open',iconCss:'sf-icon-open' }, { separator: true },
        { text: 'Save', iconCss: 'sf-icon-save' },
        { text: 'Export', iconCss: 'sf-icon-export' }, { separator: true },
        { text: 'Print', iconCss: 'sf-icon-print' }
    ];

    public getEditMenuItems: MenuItemModel[] = [
        { text: 'Undo', iconCss: 'sf-icon-undo' },
            { text: 'Redo', iconCss: 'sf-icon-redo' },
            { separator: true },
            { text: 'Cut', iconCss: 'sf-icon-cut' },
            { text: 'Copy', iconCss: 'sf-icon-copy' },
            { text: 'Paste', iconCss: 'sf-icon-paste' },
            { separator: true },
            { text: 'Rotate',iconCss:'sf-icon-rotate', items:[
                { text: 'Rotate Right 90', iconCss: 'sf-icon-rotate-clockwise' },
                { text: 'Rotate Left 90', iconCss: 'sf-icon-rotate-counter-clockwise' },
            ]},
            { text: 'Delete', iconCss: 'sf-icon-delete' },
            { separator: true },
      ];
      
    public getDesignMenuItems: MenuItemModel[] = [
        { text: 'Orientation',iconCss: 'sf-icon-page_orientation',
        items:[
            { text: 'Landscape', iconCss: 'sf-icon-check-tick' },
            { text: 'Portrait', iconCss: '' }
        ]    
        },
        { text: 'Size', iconCss: 'em-icons e-copy',
        items:this.paperList1()
        },
      ];
    public getToolsMenuItems: MenuItemModel[] = [
        { text: 'Selection Tool',iconCss: 'sf-icon-pointer' },
        { text: 'Pan Tool', iconCss: 'sf-icon-pan tb-icons' },
      ];
    public getSelectMenuItems: ItemModel[] = [
        { text: 'Select All' },
        { text: 'Select All Nodes'},
        { text: 'Select All Connectors'},
        { text: 'Deselect All'}
      ];

  public getViewMenuItems: ItemModel[] = [
        { text: 'Show Lines',iconCss: 'sf-icon-check-tick'},
        { text: 'Snap To Grid',iconCss : 'sf-icon-check-tick'},
        { text: 'Snap To Object',iconCss : 'sf-icon-check-tick'},
        { text: 'Show Ruler',iconCss: 'sf-icon-check-tick'},
        { text: 'Show Page Breaks',iconCss: ''},
        { text: 'Show Multiple page',iconCss: 'sf-icon-check-tick'},
        { separator: true },
        { text: 'Fit To Width'},
        { text: 'Fit To Page'},
      ];
    public paperList1(){ var items= [
        { text: 'Letter (8.5 in x 11 in)', value: 'Letter',iconCss:'sf-icon-check-tick' }, { text: 'Legal (8.5 in x 14 in)', value: 'Legal' },
        { text: 'Tabloid (279 mm x 432 mm)', value: 'Tabloid' }, { text: 'A3 (297 mm x 420 mm)', value: 'A3' },
        { text: 'A4 (210 mm x 297 mm)', value: 'A4' }, { text: 'A5 (148 mm x 210 mm)', value: 'A5' },
        { text: 'A6 (105 mm x 148 mm)', value: 'A6' },
        ];
         return items
    };
    public conTypeItems:ItemModel[] = [
        {text: 'Straight',iconCss: 'sf-icon-straight_line'},
                     {text: 'Orthogonal',iconCss: 'sf-icon-orthogonal_line'},
                     {text: 'Bezier',iconCss: 'sf-icon-bezier'}
    ];
    public zoomMenuItems:ItemModel[] = [
        { text: 'Zoom In' },{ text: 'Zoom Out' },{ text: 'Zoom to Fit' },{ text: 'Zoom to 50%' },
        { text: 'Zoom to 100%' },{ text: 'Zoom to 200%' },
    ];

    public fileFormats: { [key: string]: Object }[] = [
        { text: 'JPG', value: 'JPG' }, { text: 'PNG', value: 'PNG' },
        { text: 'SVG', value: 'SVG' }
    ];
    public diagramRegions: { [key: string]: Object }[] = [
        { text: 'Content', value: 'Content' }, { text: 'PageSettings', value: 'PageSettings' }
    ];
    public paperList: { [key: string]: Object }[] = [
        { text: 'Letter (8.5 in x 11 in)', value: 'Letter' }, { text: 'Legal (8.5 in x 14 in)', value: 'Legal' },
        { text: 'Tabloid (279 mm x 432 mm)', value: 'Tabloid' }, { text: 'A3 (297 mm x 420 mm)', value: 'A3' },
        { text: 'A4 (210 mm x 297 mm)', value: 'A4' }, { text: 'A5 (148 mm x 210 mm)', value: 'A5' },
        { text: 'A6 (105 mm x 148 mm)', value: 'A6' }, { text: 'Custom', value: 'Custom' },
    ];
}

