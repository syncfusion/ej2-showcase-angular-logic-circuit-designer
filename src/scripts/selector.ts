import { Component, Input } from "@angular/core";
import { Connector, ConnectorConstraints, ConnectorModel, DecoratorShapes, Diagram, DiagramClickEventObject, Gradient, GradientModel, GradientType, LinearGradient, NodeConstraints, NodeModel, Segments, TextStyleModel } from "@syncfusion/ej2-diagrams";
import { ToolbarComponent } from "@syncfusion/ej2-angular-navigations";
import { UtilityMethods } from "./utilitymethods";

@Component({
    template: ''
  })

export class SelectorViewModel{
    public diagram:Diagram|any;
    public toolbarObj:ToolbarComponent|any;
    public preventPropertyChange: boolean = false;
    public isModified: boolean = false;
    public utilityMethods: UtilityMethods = new UtilityMethods();
    public exportSettings: ExportSettings = new ExportSettings();
    public printSettings: PrintSettings = new PrintSettings();
    public pageSettings: PageSettings = new PageSettings();
    constructor() {
        
    } 
}

@Component({
    template: ''
  })
export class ExportSettings {
    private m_fileName: string = 'Diagram';
    public get fileName(): string {
        return this.m_fileName;
    }

    @Input()
    public set fileName(fileName: string) {
        this.m_fileName = fileName;
    }

    private m_format: string = 'JPG';
    public get format(): string {
        return this.m_format;
    }

    @Input()
    public set format(format: string) {
        this.m_format = format;
    }

    private m_region: string = 'PageSettings';
    public get region(): string {
        return this.m_region;
    }

    @Input()
    public set region(region: string) {
        this.m_region = region;
    }
}
@Component({
    template: ''
  })
export class PrintSettings {
    private m_region: string = 'PageSettings';
    public get region(): string {
        return this.m_region;
    }

    @Input()
    public set region(region: string) {
        this.m_region = region;
    }

    private m_pageWidth: number = 100;
    public get pageWidth(): number {
        return this.m_pageWidth;
    }

    @Input()
    public set pageWidth(pageWidth: number) {
        this.m_pageWidth = pageWidth;
    }

    private m_pageHeight: number = 100;
    public get pageHeight(): number {
        return this.m_pageHeight;
    }

    @Input()
    public set pageHeight(pageHeight: number) {
        this.m_pageHeight = pageHeight;
    }

    private m_isPortrait: boolean = true;
    public get isPortrait(): boolean {
        return this.m_isPortrait;
    }

    @Input()
    public set isPortrait(isPortrait: boolean) {
        this.m_isPortrait = isPortrait;
    }

    private m_isLandscape: boolean = false;
    public get isLandscape(): boolean {
        return this.m_isLandscape;
    }

    @Input()
    public set isLandscape(isLandscape: boolean) {
        this.m_isLandscape = isLandscape;
    }

    private m_multiplePage: boolean = false;
    public get multiplePage(): boolean {
        return this.m_multiplePage;
    }

    @Input()
    public set multiplePage(multiplePage: boolean) {
        this.m_multiplePage = multiplePage;
    }

    private m_paperSize: string = 'Letter';
    public get paperSize(): string {
        return this.m_paperSize;
    }

    @Input()
    public set paperSize(paperSize: string) {
        this.m_paperSize = paperSize;
        (document.getElementById('printCustomSize') as any).style.display = 'none';
        (document.getElementById('printOrientation')as any).style.display = 'none';
        if (paperSize === 'Custom') {
            (document.getElementById('printCustomSize')as any).style.display = '';
        } else {
            (document.getElementById('printOrientation')as any).style.display = '';
        }
    }

}

export class PageSettings {
    public pageWidth: number = 1056;
    public pageHeight: number = 816;
    public showPageBreaks: boolean=false;
    public backgroundColor: string = '#ffffff';
    public isPortrait: boolean = false;
    public isLandscape: boolean = true;
    public paperSize: string = 'Letter';
    public pageBreaks: boolean = false;
}

