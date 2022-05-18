export function getFile(url: string, fileName: string) {
  const extension = fileName.split(".").pop();
  const isTxt = extension === "txt";

  if (isTxt) {
    fetch(url)
      .then((resp) => resp.text())
      .then((text) => {
        const element = document.createElement("a");
        const file = new Blob([text], {
          type: "text/plain",
        });
        element.href = URL.createObjectURL(file);
        element.download = fileName;
        document.body.appendChild(element);
        element.click();
      });
  } else {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  }
}

export async function readLogFile(url: string) {
  const resp = await fetch(url);
  return await resp.text();
}
