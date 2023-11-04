const url : string = "https://image-api-chi.vercel.app/api/image"

const example : string = '{ "startdate": "20231103", "fullstartdate": "202311032300", "enddate": "20231104", "url": "/th?id=OHR.BisonSnow_ES-ES4930036956_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp", "urlbase": "/th?id=OHR.BisonSnow_ES-ES4930036956", "copyright": "Bisonte americano, Parque Nacional de Yellowstone, Wyoming, EE.UU. (© Gary Gray/Getty Images)", "copyrightlink": "https://www.bing.com/search?q=Bisonte+americano&form=hpcapt&filters=HpDate%3a%2220231103_2300%22", "title": "Diseñados para el frío", "quiz": "/search?q=Bing+homepage+quiz&filters=WQOskey:%22HPQuiz_20231103_BisonSnow%22&FORM=HPQUIZ", "wp": true, "hsh": "9be7486cd3645e3c9e7b3d346653c21e", "drk": 1, "top": 1, "bot": 1, "hs": [] }'

export default async function getImage() {
  if (!import.meta.env.PROD) return JSON.parse(example)

  const response = await fetch(url)
  const body = await response.json()
  return body.images[0]
}