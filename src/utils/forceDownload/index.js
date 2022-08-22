const forceDownload = (url, fileName) => {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "blob";
  xhr.onload = function () {
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(this.response);
    var tag = document.createElement("a");
    tag.href = imageUrl;
    tag.download = fileName;
    document.body.appendChild(tag);
    tag.click();
    document.body.removeChild(tag);
  };
  xhr.send();
};

// const forceDownload = async (url, fileName) => {
//   // const URL = `${endPoint[0].url}${
//   //   endPoint[0].port !== "" ? ":" + endPoint[0].port : ""
//   // }/api/v1/report/file-download/`;

//   const URL =
//     "http://192.168.101.211:1010/public/image/odometer/odometer-image-1660198365330.jpeg";

//   await axios
//     .get(URL, {
//       responseType: "arraybuffer", // Important
//       headers: {
//         "Content-Type": "application/gzip",
//       },
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// const forceDownload = async (url, fileName) => {
//   fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//       "Access-Control-Allow-Origin": "*",
//     },
//   })
//     .then((resp) => resp.blob())
//     .then((blob) => {
//       console.log(blob);
//     })
//     .catch(() => alert("oh no!"));
// };

export default forceDownload;
