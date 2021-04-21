import { React, useState, useEffect } from "react";

export let YOUR_API_KEY = "YOUR_API_KEY";


let n = new Date();
let year = n.getFullYear();
const month = () => String(n.getMonth() + 1).length === 1 ? "0" + Number(n.getMonth() + 1) : Number(n.getMonth() + 1);
const day = () => String(n.getDate()).length === 1 ? "0" + Number(new Date(Date.now() - 86400000).getDate()) : new Date(Date.now() - 86400000).getDate();
let randomDate = year + "-" + month() + "-" + day();

let past = new Date(Date.now() - 2419200000);
let lastDay = past.toISOString().slice(0, 10);

function showMoreDatas(title, date, url, copyright, explanation) {
  let closeX = `<span id="closeBtn" class="close cursor"> × </span>`;

  document.body.insertAdjacentHTML("beforeend", `
  <div id="myModal" class="modal" style="display: flex;">
    <div class="modal-content">
      <div class="inner">
          <h1>${title}</h1>
          <p>${date}</p>
          <img src="${url}" alt="${url}" class="showUpImg">
          <p><b>${copyright}</b></p>
          <p>${explanation}</p>

          ${closeX}
          
      </div>
    </div>
  </div>`)

  closeModal();

}

function closeModal() {
  let closeX = Array.from(document.querySelectorAll("#closeBtn"));
  closeX.map(x => x.addEventListener("click", omg));
}

function omg() {
  let xxx = Array.from(document.querySelectorAll("#myModal"));
  xxx.map(x => x.remove())
}

const Gallery = (props) => {
  const [rangeDatas, setRangeDatas] = useState([])

  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${YOUR_API_KEY}&start_date=${lastDay}&end_date=${randomDate}`)
      .then(response => response.json())
      .then((json) => setRangeDatas(json));
    return () => {
      setRangeDatas([])
    }
  }, [])

  return <>
    {props.children}
    <div id="picCont">
      {rangeDatas.map((item, index) => {
        if (item.media_type === "image") {
          return (
            <div>
              <img src={item.url} alt={item.url} className="galleryImages" id={"img" + index} key={index} onClick={() => { showMoreDatas(item.title, item.date, item.url, item.copyright, item.explanation) }} />
            </div>
          )
        } else {
          return <iframe src={item.url} frameborder='0' allow='autoplay; encrypted-media' allowfullscreen title='video' />
        }
      })}
    </div>
  </>;
};

export default Gallery;