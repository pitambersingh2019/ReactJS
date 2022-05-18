import { CHART_CUSTOM_CLASS_NAME } from "../constants";
import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";
import { PCChart } from "../ts";
import { Data } from "react-csv/components/CommonPropTypes";

//random id between 100 and 600
export const getRandomId = () => Math.floor(Math.random() * 600) + 100;

async function creatPdf({
  doc,
  elements,
}: {
  doc: jsPDF;
  elements: HTMLCollectionOf<Element>;
}) {
  const padding = 10;
  const verticalMargin = 20;
  let top = 20;

  //pdf doc page size
  let pageHeight = doc.internal.pageSize.getHeight();
  let pageWidth = doc.internal.pageSize.getWidth();

  for (let i = 0; i < elements.length; i++) {
    const el = elements.item(i) as HTMLElement;

    //remove export button
    const exportButton = el.querySelector(".highcharts-exporting-group");
    exportButton && exportButton.parentElement?.removeChild(exportButton);

    let elHeight = el.offsetHeight;
    let elWidth = el.offsetWidth;

    //if chart do not fit to the page width
    if (elWidth > pageWidth) {
      const ratio = pageWidth / elWidth;
      //resize chart width and heigth proportionally
      elHeight = elHeight * ratio - padding * 2;
      elWidth = elWidth * ratio - padding * 2;
    }

    //if chart do not fit to the page height
    if (top + elHeight > pageHeight) {
      doc.addPage(); // add new page
      top = verticalMargin; // reset height counter
    }

    const imgData = await htmlToImage.toPng(el);
    doc.addImage(
      imgData,
      "PNG",
      padding,
      top,
      elWidth,
      elHeight,
      `image${i}`,
      "SLOW"
    );
    top = top + elHeight + verticalMargin;
  }
}

export const exportMultipleChartsToPdf = async () => {
  const elements = document.getElementsByClassName(CHART_CUSTOM_CLASS_NAME);

  const doc = new jsPDF("p", "px");

  await creatPdf({ doc, elements });
  doc.save(`charts.pdf`);
};

export function isEmpty(obj: Object) {
  return Object.keys(obj).length === 0;
}

export function makeCSVData(pcChartsData: PCChart[] | undefined): Data {
  if (!pcChartsData) {
    return [];
  }

  const result = pcChartsData.map((chart) => {
    for (const [key, value] of Object.entries(chart)) {
      const chartData = value.map((item) => {
        if (item.data.Graph) {
          const title = [
            key,
            item.machineDisplayName,
            item.paramDisplayName,
            "",
            "",
            "",
            "",
          ];
          const keys = Object.keys(item.data.Graph[0]);
          const values = item.data.Graph.map((graph) => {
            return Object.values(graph).map((value) => value || "");
          });
          return [title, keys, ...values];
        } else {
          return [];
        }
      });

      return chartData;
    }
    return [];
  });
  return result.flat(2);
}
