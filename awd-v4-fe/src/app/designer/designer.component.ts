import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef, ViewChild } from '@angular/core';
import * as go from 'gojs';
import { DataSyncService, DiagramComponent, PaletteComponent } from 'gojs-angular';

@Component({
	selector: 'app-designer',
	templateUrl: './designer.component.html',
	styleUrls: ['./designer.component.sass'],
	encapsulation: ViewEncapsulation.None
})
export class DesignerComponent implements OnInit {
	constructor() {

	}

	ngOnInit(): void {

	}

	public initDiagram(): go.Diagram {
	
		const $ = go.GraphObject.make;
		var graygrad = $(
			go.Brush, "Linear", {
				0: "whitesmoke",
				0.1: "whitesmoke",
				0.9: "whitesmoke",
				1: "whitesmoke"
			}
		);
		const dia = $(
			go.Diagram, {
				'undoManager.isEnabled': true,
				allowCopy: true,
				"grid.visible": true,
				"grid.gridCellSize": new go.Size(30, 30),
				"toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
				validCycle: go.Diagram.CycleNotDirected,
				initialAutoScale: go.Diagram.UniformToFill,
				layout: $(go.LayeredDigraphLayout, {
					direction: 90
				}),
				model: $(
					go.GraphLinksModel,{
						linkKeyProperty: 'key'
					}
				)
			}
		);

		dia.nodeTemplate = $(go.Node, "Auto", {
			selectionAdorned: false
		},
			$(
				go.Shape,
				"RoundedRectangle",
				{ 
					fill: graygrad,
					stroke: "gray",
					minSize: new go.Size(200, 60)
				},
				new go.Binding("fill", "isSelected", function (s) { return s ? "#2196F3" : graygrad; }).ofObject()
			),
			$(go.TextBlock, {
					font: '12px BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif',
					editable: false,
					margin: new go.Margin(-20, 0, 0, 80),
					alignment: go.Spot.Left
				},
				new go.Binding("stroke", "isSelected", function (s) { return s ? "white" : "black"; }).ofObject(),
				new go.Binding("text", "text")
			),
			$(go.TextBlock, {
					font: '12px BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif',
					editable: false,
					margin: new go.Margin(5, 0, 0, 80),
					alignment: go.Spot.Left
				},
				new go.Binding("stroke", "isSelected", function (s) { return s ? "white" : "black"; }).ofObject(),
				new go.Binding("text", "category")
			),
			$(go.TextBlock, {
					font: '12px BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif',
					editable: false,
					margin: new go.Margin(35, 0, 0, 80),
					alignment: go.Spot.Left
				},
				new go.Binding("stroke", "isSelected", function (s) { return s ? "white" : "black"; }).ofObject(),
				new go.Binding("text", "type")
			),
		)
		dia.nodeTemplateMap.add("revo",$(go.Node, "Auto", {
				selectionAdorned: false
			},
				$(
					go.Shape,
					"RoundedRectangle",
					{ 
						fill: graygrad,
						stroke: "gray",
						minSize: new go.Size(200, 50)
					},
					new go.Binding("fill", "isSelected", function (s) { return s ? "#2196F3" : graygrad; }).ofObject()
				),
				$(go.Picture, {
					source: "assets/revo_trans.png",
					width: 40,
					height: 32.790,
					margin: new go.Margin(0, 0, 0, -90)
				}),
				$(go.TextBlock, {
						font: '12px BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif',
						editable: false,
						margin: new go.Margin(-18, 0, 0, 70),
						alignment: go.Spot.Left
					},
					new go.Binding("stroke", "isSelected", function (s) { return s ? "white" : "black"; }).ofObject(),
					new go.Binding("text", "text")
				),
				$(go.TextBlock, {
						font: '12px BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif',
						editable: false,
						margin: new go.Margin(13, 0, 0, 70),
						alignment: go.Spot.Left
					},
					new go.Binding("stroke", "isSelected", function (s) { return s ? "white" : "black"; }).ofObject(),
					new go.Binding("text", "type")
				),
			)
		)
		dia.nodeTemplateMap.add("Start", $(go.Node, "Spot",{
				selectionAdorned: false,
				textEditable: false,
			},
       		$(go.Panel, "Auto", $(
				go.Shape, "Rectangle", {
					fill: graygrad,
					stroke: "gray",
					minSize: new go.Size(120, 35)
				},
                new go.Binding("fill", "isSelected", function (s) { return s ? "#2196F3" : graygrad; }).ofObject()),
                $(go.TextBlock,{
						font: "12px sans-serif",
						editable: false,
						margin: new go.Margin(3, 3 + 11, 3, 3 + 4),
						alignment: go.Spot.Center
                    },
					new go.Binding("text", "text"),
					new go.Binding("stroke", "isSelected", function (s) { return s ? "white" : "black"; }).ofObject()
				)
            ),
            $(go.Panel, "Auto",{
					alignment: go.Spot.Bottom,
					portId: "from",
					fromLinkable: true
				},
                $(go.Shape, "Circle", {
					width: 20,
					height: 20,
					fill: "white",
					stroke: "#2196F3",
					strokeWidth: 2
				}),
                $(go.Shape, "PlusLine", {
					width: 10,
					height: 10,
					fill: null,
					stroke: "#2196F3",
					strokeWidth: 2
				})
            )
		));
		dia.nodeTemplateMap.add("End",
        $(go.Node, "Spot",
            { selectionAdorned: false, textEditable: false},
            $(go.Panel, "Auto",
                $(go.Shape, "Rectangle",
                    { fill: graygrad, stroke: "gray", minSize: new go.Size(120, 35) },
                    new go.Binding("fill", "isSelected", function (s) { return s ? "#2196F3" : graygrad; }).ofObject()),
					$(go.TextBlock,
                    {
                        font: "12px sans-serif", editable: true,
                        margin: new go.Margin(3 , 3 + 11, 3, 3 + 4), alignment: go.Spot.Center
					},
					new go.Binding("stroke", "isSelected", function (s) { return s ? "white" : "black"; }).ofObject(),
                    new go.Binding("text", "text"))
            ),
            $(go.Panel, "Auto",
                { alignment: go.Spot.Top, portId: "to", toLinkable: true },
                $(go.Shape, "Circle",
                    { width: 8, height: 8, fill: "white", stroke: "gray" }),
                $(go.Shape, "Circle",
                    { width: 4, height: 4, fill: "#2196F3", stroke: null })
            )
        ));
		return dia;
	}

	public diagramNodeData: any = [
		{
            "key": 2,
            "text": "WF_F_RTL_SLS_WKLY",
            "category": "revo",
            "type": "bre"
		},
		{
            "key": 3,
            "text": "BRM Sales",
            "category": "spark",
            "type": "noop"
		},
		{
            "key": 4,
            "text": "PythonJob",
            "category": "python",
            "type": "noop"
		},
		{
            "key": 6,
            "text": "Next Batch Trigger",
            "category": "shell",
            "type": "noop"
		},
		{
            "key": 1,
            "text": "Start",
            "category": "Start",
            "type": "noop"
		},
		{
            "key": 9999,
            "text": "End",
            "category": "End",
            "type": "noop"
		},
		{
            "key": 5,
            "text": "MergeJob",
            "category": "Merge",
            "type": "noop"
        }
	]

	public diagramLinkData: any = [
		{"from": "1", "to": "2"},
		{"from": "2", "to": "3"},
		{"from": "2", "to": "4"},
		{"from": "3", "to": "5"},
		{"from": "4", "to": "5"},
		{"from": "5", "to": "6"},
		{"from": "6", "to": "9999"}
	];
	public diagramDivClassName: string = 'myDiagramDiv';
	public diagramModelData = { prop: 'value' };

	// When the diagram model changes, update app data to reflect those changes
	public diagramModelChange = function (changes: go.IncrementalData) {
		this.diagramNodeData = DataSyncService.syncNodeData(changes, this.diagramNodeData);
		this.diagramLinkData = DataSyncService.syncLinkData(changes, this.diagramLinkData);
		this.diagramModelData = DataSyncService.syncModelData(changes, this.diagramModelData);
	};
}
