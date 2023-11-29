const state = {
  view: {
    score: {
      player: document.getElementById("your-score"),
      enemy: document.getElementById("enemy-score"),
    },
    detail: {
      card: document.querySelector(".card-detail"),
      name: document.getElementById("card-name"),
      image: document.getElementById("card-image"),
      height: document.querySelector(".height"),
      weight: document.querySelector(".weight"),
      types: document.querySelector(".types"),
      hp: document.querySelector(".hp"),
      speed: document.querySelector(".spd"),
      attack: document.querySelector(".atk"),
      defense: document.querySelector(".def"),
    },
    fieldCard: {
      player: document.querySelector(".your-poke-card"),
      enemy: document.querySelector(".enemy-poke-card"),
    },
    cardAreas: {
      player: document.querySelector(".your-cards"),
      enemy: document.querySelector(".enemy-cards"),
    },
    turn: {
      player: document.querySelector(".your-turn"),
      enemy: document.querySelector(".enemy-turn"),
    },
    attribute: {
      selected: document.getElementsByName("option"),
      duel: document.querySelector(".attribute-selected"),
    },
    svg: {
      height: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M167.39,196.94a8,8,0,0,1-1.73,8.72l-32,32a8,8,0,0,1-11.32,0l-32-32A8,8,0,0,1,96,192h24V64H96a8,8,0,0,1-5.66-13.66l32-32a8,8,0,0,1,11.32,0l32,32A8,8,0,0,1,160,64H136V192h24A8,8,0,0,1,167.39,196.94Z" opacity="0.4"></path></svg>`,
      weight: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M244,116V88a20,20,0,0,0-20-20H208V64a20,20,0,0,0-20-20H164a20,20,0,0,0-20,20v52H112V64A20,20,0,0,0,92,44H68A20,20,0,0,0,48,64v4H32A20,20,0,0,0,12,88v28a12,12,0,0,0,0,24v28a20,20,0,0,0,20,20H48v4a20,20,0,0,0,20,20H92a20,20,0,0,0,20-20V140h32v52a20,20,0,0,0,20,20h24a20,20,0,0,0,20-20v-4h16a20,20,0,0,0,20-20V140a12,12,0,0,0,0-24ZM36,164V92H48v72Zm52,24H72V68H88Zm96,0H168V68h16Zm36-24H208V92h12Z" opacity="0.4"></path></svg>`,
      hp: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fff" viewBox="0 0 256 256"><path d="M217.36,133.36,128,224,38.64,133.36a50,50,0,0,1,70.72-70.72L128,80l18.64-17.36a50,50,0,1,1,70.72,70.72Z" opacity="0.2"></path><path d="M223,57a58.07,58.07,0,0,0-81.92-.1L128,69.05,114.91,56.86A58,58,0,0,0,33,139l89.35,90.66a8,8,0,0,0,11.4,0L223,139a58,58,0,0,0,0-82Zm-11.35,70.76L128,212.6,44.3,127.68a42,42,0,0,1,59.4-59.4l.2.2,18.65,17.35a8,8,0,0,0,10.9,0L152.1,68.48l.2-.2a42,42,0,1,1,59.36,59.44Z" opacity="0.4"></path></svg>`,
      speed: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fff" viewBox="0 0 256 256"><path d="M248,192v8a8,8,0,0,1-8,8H147.31a8,8,0,0,1-5.65-2.34l-107.32-104a8,8,0,0,1,0-11.32l64-64.13a8,8,0,0,1,11.17.13l8.23,8.23a8,8,0,0,1,2.32,5.28c1.36,27.59,21.35,45.66,48.66,47.86a8,8,0,0,1,7.27,8V120a40,40,0,0,0,40,40h0A32,32,0,0,1,248,192Z" opacity="0.2"></path><path d="M216,152a32,32,0,0,1-32-32V95.7a16,16,0,0,0-14.63-15.94c-24.35-2-40.18-17.39-41.31-40.27h0A16,16,0,0,0,123.4,29l-8.22-8.23a15.91,15.91,0,0,0-22.35-.27l-.15.14-64,64.12a16,16,0,0,0,0,22.62l.09.09,107.27,104A15.93,15.93,0,0,0,147.31,216H240a16,16,0,0,0,16-16v-8A40,40,0,0,0,216,152Zm24,48H147.31l-.09-.08L40,96l63.87-64,8.21,8.2v0c.76,15.42,6.65,28.85,17,38.83,10,9.6,23.45,15.34,38.88,16.6V112H152a8,8,0,1,0,0,16h16.68a47.64,47.64,0,0,0,5.78,16H160a8,8,0,0,0,0,16h29.51A47.67,47.67,0,0,0,216,168a24,24,0,0,1,24,24ZM64,184H32a8,8,0,0,1,0-16H64a8,8,0,0,1,0,16Zm40,24a8,8,0,0,1-8,8H48a8,8,0,0,1,0-16H96A8,8,0,0,1,104,208Z" opacity="0.4"></path></svg>`,
      attack: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fff" viewBox="0 0 256 256"><path d="M141.66,201,129,213.66a8,8,0,0,1-11.32,0L92,188,58.35,221.66a8,8,0,0,1-11.32,0L34.34,209a8,8,0,0,1,0-11.31L68,164,42.34,138.36a8,8,0,0,1,0-11.32L55,114.34a8,8,0,0,1,11.32,0l75.3,75.3A8,8,0,0,1,141.66,201Z" opacity="0.2"></path><path d="M216,32H152a8,8,0,0,0-6.34,3.12l-64,83.21L72,108.69a16,16,0,0,0-22.64,0l-12.69,12.7a16,16,0,0,0,0,22.63l20,20-28,28a16,16,0,0,0,0,22.63l12.69,12.68a16,16,0,0,0,22.62,0l28-28,20,20a16,16,0,0,0,22.64,0l12.69-12.7a16,16,0,0,0,0-22.63l-9.64-9.64,83.21-64A8,8,0,0,0,224,104V40A8,8,0,0,0,216,32ZM52.69,216,40,203.32l28-28L80.68,188Zm70.61-8L48,132.71,60.7,120,136,195.31ZM208,100.06l-81.74,62.88L115.32,152l50.34-50.34a8,8,0,0,0-11.32-11.31L104,140.68,93.07,129.74,155.94,48H208Z" opacity="0.4"></path></svg>`,
      defense:`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fff" viewBox="0 0 256 256"><path d="M216,56v58.77c0,84.18-71.31,112.07-85.54,116.8a7.54,7.54,0,0,1-4.92,0C111.31,226.86,40,199,40,114.79V56a8,8,0,0,1,8-8H208A8,8,0,0,1,216,56Z" opacity="0.2"></path><path d="M208,40H48A16,16,0,0,0,32,56v58.77c0,89.61,75.82,119.34,91,124.39a15.53,15.53,0,0,0,10,0c15.2-5.05,91-34.78,91-124.39V56A16,16,0,0,0,208,40Zm0,74.79c0,78.42-66.35,104.62-80,109.18-13.53-4.51-80-30.69-80-109.18V56l160,0Z" opacity="0.4"></path></svg>`,
    },
    types: {
      bug: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M200,104v48a72,72,0,0,1-72,72h0a72,72,0,0,1-72-72V104Z" opacity="0.2"></path><path d="M208,144h16a8,8,0,0,0,0-16H208V112h16a8,8,0,0,0,0-16H207.6a79.76,79.76,0,0,0-21.44-46.85l19.5-19.49a8,8,0,1,0-11.32-11.32l-20.29,20.3a79.74,79.74,0,0,0-92.1,0L61.66,18.34A8,8,0,0,0,50.34,29.66l19.5,19.49A79.76,79.76,0,0,0,48.4,96H32a8,8,0,0,0,0,16H48v16H32a8,8,0,0,0,0,16H48v8c0,2.7.14,5.37.4,8H32a8,8,0,0,0,0,16H51.68a80,80,0,0,0,152.64,0H224a8,8,0,0,0,0-16H207.6c.26-2.63.4-5.3.4-8ZM128,40a64.07,64.07,0,0,1,63.48,56h-127A64.07,64.07,0,0,1,128,40Zm8,175.48V136a8,8,0,0,0-16,0v79.48A64.07,64.07,0,0,1,64,152V112H192v40A64.07,64.07,0,0,1,136,215.48Z" opacity="0.6"></path></svg>`,
      dark:`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M227.89,147.89A96,96,0,1,1,108.11,28.11,96.09,96.09,0,0,0,227.89,147.89Z" opacity="0.2"></path><path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z" opacity="0.6"></path></svg>`,
      dragon:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="ffffff" class="bi bi-browser-firefox" viewBox="0 0 16 16"><path d="M13.384 3.408c.535.276 1.22 1.152 1.556 1.963a7.98 7.98 0 0 1 .503 3.897l-.009.077a8.533 8.533 0 0 1-.026.224A7.758 7.758 0 0 1 .006 8.257v-.04c.016-.363.055-.724.114-1.082.01-.074.075-.42.09-.489l.01-.051a6.551 6.551 0 0 1 1.041-2.35c.217-.31.46-.6.725-.87.233-.238.487-.456.758-.65a1.5 1.5 0 0 1 .26-.137c-.018.268-.04 1.553.268 1.943h.003a5.744 5.744 0 0 1 1.868-1.443 3.597 3.597 0 0 0 .021 1.896c.07.047.137.098.2.152.107.09.226.207.454.433l.068.066.009.009a1.933 1.933 0 0 0 .213.18c.383.287.943.563 1.306.741.201.1.342.168.359.193l.004.008c-.012.193-.695.858-.933.858-2.206 0-2.564 1.335-2.564 1.335.087.997.714 1.839 1.517 2.357a3.72 3.72 0 0 0 .439.241c.076.034.152.065.228.094.325.115.665.18 1.01.194 3.043.143 4.155-2.804 3.129-4.745v-.001a3.005 3.005 0 0 0-.731-.9 2.945 2.945 0 0 0-.571-.37l-.003-.002a2.679 2.679 0 0 1 1.87.454 3.915 3.915 0 0 0-3.396-1.983c-.078 0-.153.005-.23.01l-.042.003V4.31h-.002a3.882 3.882 0 0 0-.8.14 6.454 6.454 0 0 0-.333-.314 2.321 2.321 0 0 0-.2-.152 3.594 3.594 0 0 1-.088-.383 4.88 4.88 0 0 1 1.352-.289l.05-.003c.052-.004.125-.01.205-.012C7.996 2.212 8.733.843 10.17.002l-.003.005.003-.001.002-.002h.002l.002-.002a.028.028 0 0 1 .015 0 .02.02 0 0 1 .012.007 2.408 2.408 0 0 0 .206.48c.06.103.122.2.183.297.49.774 1.023 1.379 1.543 1.968.771.874 1.512 1.715 2.036 3.02l-.001-.013a8.06 8.06 0 0 0-.786-2.353Z"/></svg>`,
      electric: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M96,240l16-80L48,136,160,16,144,96l64,24Z" opacity="0.2"></path><path d="M215.79,118.17a8,8,0,0,0-5-5.66L153.18,90.9l14.66-73.33a8,8,0,0,0-13.69-7l-112,120a8,8,0,0,0,3,13l57.63,21.61L88.16,238.43a8,8,0,0,0,13.69,7l112-120A8,8,0,0,0,215.79,118.17ZM109.37,214l10.47-52.38a8,8,0,0,0-5-9.06L62,132.71l84.62-90.66L136.16,94.43a8,8,0,0,0,5,9.06l52.8,19.8Z" opacity="0.6"></path></svg>`,
      fairy: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M225.12,119.71c-7.86,30.94-29.31,32.71-37.36,32.23h-1A36,36,0,1,1,128,180a36,36,0,1,1-58.72-28.06h-1c-8,.48-29.5-1.29-37.36-32.23C22.79,87.84,15.78,48,47.07,48S128,95.8,128,127.67C128,95.8,177.64,48,208.93,48S233.21,87.84,225.12,119.71Z" opacity="0.2"></path><path d="M232.7,50.48C229,45.7,221.84,40,209,40c-16.85,0-38.46,11.28-57.81,30.16A140.07,140.07,0,0,0,136,87.53V56a8,8,0,0,0-16,0V87.53a140.07,140.07,0,0,0-15.15-17.37C85.49,51.28,63.88,40,47,40,34.16,40,27,45.7,23.3,50.48c-6.82,8.77-12.18,24.08-.21,71.2,6.05,23.83,19.51,33,30.63,36.42A44,44,0,0,0,128,205.27a44,44,0,0,0,74.28-47.17c11.12-3.4,24.57-12.59,30.63-36.42C239.63,95.24,244.85,66.1,232.7,50.48ZM92,208A28.12,28.12,0,0,1,88.86,152a8,8,0,1,0-1.76-15.9A43.64,43.64,0,0,0,66.36,144c-8.43.09-22-3.57-27.76-26.26C35.72,106.39,27,71.86,35.94,60.3,37.37,58.46,40.09,56,47,56c27.27,0,73,44.88,73,71.67V180A28,28,0,0,1,92,208ZM217.4,117.74c-5.77,22.69-19.33,26.34-27.77,26.26a43.6,43.6,0,0,0-20.74-7.95,8,8,0,1,0-1.76,15.9A28.11,28.11,0,1,1,136,180V127.67C136,100.88,181.69,56,209,56c6.95,0,9.66,2.46,11.1,4.3C229.05,71.86,220.28,106.39,217.4,117.74Z" opacity="0.6"></path></svg>`,
      fighting: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M224,112v16a96,96,0,0,1-192,0V88a24,24,0,0,1,48,0V64a24,24,0,0,1,48,0,24,24,0,0,1,48,0V88h24A24,24,0,0,1,224,112Z" opacity="0.2"></path><path d="M200,80H184V64a32,32,0,0,0-56-21.13A32,32,0,0,0,72.21,60.42,32,32,0,0,0,24,88v40a104,104,0,0,0,208,0V112A32,32,0,0,0,200,80ZM152,48a16,16,0,0,1,16,16V80H136V64A16,16,0,0,1,152,48ZM88,64a16,16,0,0,1,32,0v40a16,16,0,0,1-32,0ZM40,88a16,16,0,0,1,32,0v16a16,16,0,0,1-32,0Zm176,40a88,88,0,0,1-175.92,3.75A31.93,31.93,0,0,0,80,125.13a31.93,31.93,0,0,0,44.58,3.35,32.21,32.21,0,0,0,11.8,11.44A47.88,47.88,0,0,0,120,176a8,8,0,0,0,16,0,32,32,0,0,1,32-32,8,8,0,0,0,0-16H152a16,16,0,0,1-16-16V96h64a16,16,0,0,1,16,16Z" opacity="0.6"></path></svg>`,
      fire: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M208,144A80,80,0,0,1,130.06,224,40,40,0,0,0,168,184c0-40-40-64-40-64s-40,24-40,64A40,40,0,0,0,125.94,224,80,80,0,0,1,48,144c0-72,80-120,80-120S208,72,208,144Z" opacity="0.2"></path><path d="M173.79,51.48a221.25,221.25,0,0,0-41.67-34.34,8,8,0,0,0-8.24,0A221.25,221.25,0,0,0,82.21,51.48C54.59,80.48,40,112.47,40,144a88,88,0,0,0,176,0C216,112.47,201.41,80.48,173.79,51.48ZM96,184c0-27.67,22.53-47.28,32-54.3,9.48,7,32,26.63,32,54.3a32,32,0,0,1-64,0Zm77.27,15.93A47.8,47.8,0,0,0,176,184c0-44-42.09-69.79-43.88-70.86a8,8,0,0,0-8.24,0C122.09,114.21,80,140,80,184a47.8,47.8,0,0,0,2.73,15.93A71.88,71.88,0,0,1,56,144c0-34.41,20.4-63.15,37.52-81.19A216.21,216.21,0,0,1,128,33.54a215.77,215.77,0,0,1,34.48,29.27C193.49,95.5,200,125,200,144A71.88,71.88,0,0,1,173.27,199.93Z" opacity="0.6"></path></svg>`,
      flying:`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M215.8,119.6l-69.26,70.06a8,8,0,0,1-5.65,2.34H64.2V115.31a8,8,0,0,1,2.34-5.65L112.2,64.52V144l24-24Z" opacity="0.2"></path><path d="M221.28,34.75a64,64,0,0,0-90.49,0L60.69,104A15.9,15.9,0,0,0,56,115.31v73.38L26.34,218.34a8,8,0,0,0,11.32,11.32L67.32,200H140.7A15.92,15.92,0,0,0,152,195.32l0,0,69.23-70A64,64,0,0,0,221.28,34.75ZM142.07,46.06A48,48,0,0,1,211.79,112H155.33l34.35-34.34a8,8,0,0,0-11.32-11.32L120,124.69V67.87ZM72,115.35l32-31.67v57l-32,32ZM140.7,184H83.32l56-56h56.74Z" opacity="0.6"></path></svg>`,
      ghost: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M216,120v96l-29.33-24-29.34,24L128,192,98.67,216,69.33,192,40,216V120a88,88,0,0,1,176,0Z" opacity="0.2"></path><path d="M112,116a12,12,0,1,1-12-12A12,12,0,0,1,112,116Zm44-12a12,12,0,1,0,12,12A12,12,0,0,0,156,104Zm68,16v96a8,8,0,0,1-13.07,6.19l-24.26-19.85L162.4,222.19a8,8,0,0,1-10.13,0L128,202.34l-24.27,19.85a8,8,0,0,1-10.13,0L69.33,202.34,45.07,222.19A8,8,0,0,1,32,216V120a96,96,0,0,1,192,0Zm-16,0a80,80,0,0,0-160,0v79.12l16.27-13.31a8,8,0,0,1,10.13,0l24.27,19.85,24.26-19.85a8,8,0,0,1,10.14,0l24.26,19.85,24.27-19.85a8,8,0,0,1,10.13,0L208,199.12Z" opacity="0.6"></path></svg>`,
      grass: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M63.81,192.19c-47.89-79.81,16-159.62,151.64-151.64C223.43,176.23,143.62,240.08,63.81,192.19Z" opacity="0.2"></path><path d="M223.45,40.07a8,8,0,0,0-7.52-7.52C139.8,28.08,78.82,51,52.82,94a87.09,87.09,0,0,0-12.76,49c.57,15.92,5.21,32,13.79,47.85l-19.51,19.5a8,8,0,0,0,11.32,11.32l19.5-19.51C81,210.73,97.09,215.37,113,215.94q1.67.06,3.33.06A86.93,86.93,0,0,0,162,203.18C205,177.18,227.93,116.21,223.45,40.07ZM153.75,189.5c-22.75,13.78-49.68,14-76.71.77l88.63-88.62a8,8,0,0,0-11.32-11.32L65.73,179c-13.19-27-13-54,.77-76.71,22.09-36.47,74.6-56.44,141.31-54.06C210.2,114.89,190.22,167.41,153.75,189.5Z" opacity="0.6"></path></svg>`,
      ground: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M94.9,75.94,125.65,128H50.35L81.1,75.94A8,8,0,0,1,94.9,75.94ZM164,72a20,20,0,1,0-20-20A20,20,0,0,0,164,72Zm29.44,35.92a8,8,0,0,0-13.77,0l-33.06,55.79L168,200h80Z" opacity="0.2"></path><path d="M164,80a28,28,0,1,0-28-28A28,28,0,0,0,164,80Zm0-40a12,12,0,1,1-12,12A12,12,0,0,1,164,40Zm90.88,155.92-54.56-92.08A15.87,15.87,0,0,0,186.55,96h0a15.85,15.85,0,0,0-13.76,7.84L146.63,148l-44.84-76.1a16,16,0,0,0-27.58,0L1.11,195.94A8,8,0,0,0,8,208H248a8,8,0,0,0,6.88-12.08ZM88,80l23.57,40H64.43ZM22,192l33-56h66l18.74,31.8,0,0L154,192Zm150.57,0-16.66-28.28L186.55,112,234,192Z" opacity="0.6"></path></svg>`,
      ice: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M227.65,149.14a12,12,0,0,1-8.79,14.51l-20.67,5.08,5.4,20.16a12,12,0,0,1-23.18,6.22l-7.29-27.2L140,148.78V187l20.48,20.48a12,12,0,0,1-17,17L128,209l-15.51,15.52a12,12,0,0,1-17-17L116,187V148.78L82.88,167.91l-7.29,27.2a12,12,0,0,1-23.18-6.22l5.4-20.16-20.67-5.08a12,12,0,1,1,5.72-23.3l27.89,6.85L104,128,70.75,108.8l-27.89,6.85A11.8,11.8,0,0,1,40,116a12,12,0,0,1-2.85-23.65l20.67-5.08-5.4-20.16a12,12,0,0,1,23.18-6.22l7.29,27.2L116,107.21V69L95.52,48.48a12,12,0,0,1,17-17L128,47l15.51-15.52a12,12,0,1,1,17,17L140,69v38.24l33.12-19.12,7.29-27.2a12,12,0,0,1,23.18,6.22l-5.4,20.16,20.67,5.08A12,12,0,0,1,216,116a11.8,11.8,0,0,1-2.87-.35l-27.89-6.85L152,128l33.25,19.2,27.89-6.85A12,12,0,0,1,227.65,149.14Z" opacity="0.6"></path></svg>`,
      normal:`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M226.76,135.48l-63.45,23.07a8,8,0,0,0-4.76,4.76l-23.07,63.45a8,8,0,0,1-15,0L97.45,163.31a8,8,0,0,0-4.76-4.76L29.24,135.48a8,8,0,0,1,0-15L92.69,97.45a8,8,0,0,0,4.76-4.76l23.07-63.45a8,8,0,0,1,15,0l23.07,63.45a8,8,0,0,0,4.76,4.76l63.45,23.07A8,8,0,0,1,226.76,135.48Z" opacity="0.2"></path><path d="M229.5,113,166.07,90,143,26.5a16,16,0,0,0-30,0L90,89.93,26.5,113a16,16,0,0,0,0,30l63.43,23L113,229.5a16,16,0,0,0,30,0l23.07-63.44L229.5,143a16,16,0,0,0,0-30Zm-68.93,38a16,16,0,0,0-9.54,9.54L128,223.9l-23-63.33A16,16,0,0,0,95.43,151L32.1,128l63.33-23A16,16,0,0,0,105,95.43L128,32.1l23,63.33a16,16,0,0,0,9.54,9.54l63.33,23Z" opacity="0.6"></path></svg>`,
      poison: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M174,47.75a254.19,254.19,0,0,0-41.45-38.3,8,8,0,0,0-9.18,0A254.19,254.19,0,0,0,82,47.75C54.51,79.32,40,112.6,40,144a88,88,0,0,0,176,0C216,112.6,201.49,79.32,174,47.75Zm9.85,105.59a57.6,57.6,0,0,1-46.56,46.55A8.75,8.75,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68Z" opacity="0.6"></path></svg>`,
      psychic:`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M188,96a20,20,0,0,0-20,20V60a20,20,0,0,0-40,0V44a20,20,0,0,0-40,0V76a20,20,0,0,0-40,0v76a80,80,0,0,0,160,0V116A20,20,0,0,0,188,96ZM128,200c-32,0-48-32-48-32s16-32,48-32,48,32,48,32S160,200,128,200Z" opacity="0.2"></path><path d="M188,88a27.75,27.75,0,0,0-12,2.71V60a28,28,0,0,0-41.36-24.6A28,28,0,0,0,80,44v6.71A27.75,27.75,0,0,0,68,48,28,28,0,0,0,40,76v76a88,88,0,0,0,176,0V116A28,28,0,0,0,188,88Zm12,64a72,72,0,0,1-144,0V76a12,12,0,0,1,24,0v36a8,8,0,0,0,16,0V44a12,12,0,0,1,24,0v60a8,8,0,0,0,16,0V60a12,12,0,0,1,24,0v60a8,8,0,0,0,16,0v-4a12,12,0,0,1,24,0Zm-60,16a12,12,0,1,1-12-12A12,12,0,0,1,140,168Zm-12-40c-36.52,0-54.41,34.94-55.16,36.42a8,8,0,0,0,0,7.16C73.59,173.06,91.48,208,128,208s54.41-34.94,55.16-36.42a8,8,0,0,0,0-7.16C182.41,162.94,164.52,128,128,128Zm0,64c-20.63,0-33.8-16.52-38.7-24,4.9-7.48,18.07-24,38.7-24s33.81,16.53,38.7,24C161.8,175.48,148.63,192,128,192Z" opacity="0.6"></path></svg>`,
      rock:`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M224,80.18v95.64a8,8,0,0,1-4.16,7l-88,48.18a8,8,0,0,1-7.68,0l-88-48.18a8,8,0,0,1-4.16-7V80.18a8,8,0,0,1,4.16-7l88-48.18a8,8,0,0,1,7.68,0l88,48.18A8,8,0,0,1,224,80.18Z" opacity="0.2"></path><path d="M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM216,175.82,128,224,40,175.82V80.18L128,32h0l88,48.17Z" opacity="0.6"></path></svg>`,
      steel:`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M207.86,123.18l16.78-21a99.14,99.14,0,0,0-10.07-24.29l-26.7-3a81,81,0,0,0-6.81-6.81l-3-26.71a99.43,99.43,0,0,0-24.3-10l-21,16.77a81.59,81.59,0,0,0-9.64,0l-21-16.78A99.14,99.14,0,0,0,77.91,41.43l-3,26.7a81,81,0,0,0-6.81,6.81l-26.71,3a99.43,99.43,0,0,0-10,24.3l16.77,21a81.59,81.59,0,0,0,0,9.64l-16.78,21a99.14,99.14,0,0,0,10.07,24.29l26.7,3a81,81,0,0,0,6.81,6.81l3,26.71a99.43,99.43,0,0,0,24.3,10l21-16.77a81.59,81.59,0,0,0,9.64,0l21,16.78a99.14,99.14,0,0,0,24.29-10.07l3-26.7a81,81,0,0,0,6.81-6.81l26.71-3a99.43,99.43,0,0,0,10-24.3l-16.77-21A81.59,81.59,0,0,0,207.86,123.18ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z" opacity="0.2"></path>
        <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.6,107.6,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.29,107.29,0,0,0-26.25-10.86,8,8,0,0,0-7.06,1.48L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.6,107.6,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8.06,8.06,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8.06,8.06,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z" opacity="0.6"></path></svg>`,
      water: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M208,144a80,80,0,0,1-160,0c0-72,80-128,80-128S208,72,208,144Z" opacity="0.2"></path><path d="M174,47.75a254.19,254.19,0,0,0-41.45-38.3,8,8,0,0,0-9.18,0A254.19,254.19,0,0,0,82,47.75C54.51,79.32,40,112.6,40,144a88,88,0,0,0,176,0C216,112.6,201.49,79.32,174,47.75ZM128,216a72.08,72.08,0,0,1-72-72c0-57.23,55.47-105,72-118,16.53,13,72,60.75,72,118A72.08,72.08,0,0,1,128,216Zm55.89-62.66a57.6,57.6,0,0,1-46.56,46.55A8.75,8.75,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68Z" opacity="0.6"></path></svg>`,
    },
    result: {
      page: document.querySelector(".continue-page"),
      message: document.querySelector(".result"),
    }
  },
  values: {
    numberOfCards: 2,
    roundsPlayed: 0,
    playerScore: 0,
    playerPokemonList: null,
    playerPokemonInField: null,
    enemyScore: 0,
    enemyPokemonList: null,
    enemyPokemonInField: null,
    playingOrder: null,
    attributes: ["height", "weight", "hp", "speed", "attack", "defense"],
    attributeSelected: null,
  },
  action: {
    attributeSelector: document.querySelector(".confirm-attribute"),
    pokemonSelector: document.querySelector(".confirm-pokemon"),
    continueButton: document.querySelector(".restart")
  }
}
async function getPokemonData(pokemonId) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const data = await response.json();
  return data;
}
function randomGenerator() {
  return(Math.floor(Math.random()*1017)+1);
}
function idCardsHandGenerator() {
  const idArray = [];
  for (let i = 1; i <= state.values.numberOfCards; i++) {
    idArray.push(randomGenerator())
  }
  return idArray
}
async function cardInHandGenerator() {
  const idArray = idCardsHandGenerator();  
  const cardInHandList = [];

  for (let i = 0; i < idArray.length; i++) {
    const pokemonData = await(getPokemonData(idArray[i]))
    const pokemon = {
      id: pokemonData.id,
      name: pokemonData.name,
      height: pokemonData.height,
      weight: pokemonData.weight,
      types: pokemonData.types.map(type => type.type.name),
      image: (pokemonData.sprites.other.dream_world.front_default)?pokemonData.sprites.other.dream_world.front_default:pokemonData.sprites.front_default,
      hp: pokemonData.stats.find((item) => item.stat.name === "hp").base_stat,
      speed: pokemonData.stats.find((item) => item.stat.name === "speed").base_stat,
      attack: pokemonData.stats.find((item) => item.stat.name === "attack").base_stat,
      defense: pokemonData.stats.find((item) => item.stat.name === "defense").base_stat,
    }
    cardInHandList.push(pokemon)
  }
  return cardInHandList
}
function createCards(pokelist, cardArea, cardClass) {
  for (let i = 0; i < pokelist.length; i++) {
    const card = document.createElement("div");
    card.key = pokelist[i].name;
    card.classList.add(cardClass);

    const name = document.createElement("p");
    name.textContent = pokelist[i].name;

    const image = document.createElement("img");
    image.src = pokelist[i].image;
    image.alt = pokelist[i].name;

    pokelist[i].types.forEach((type) => {
      card.classList.add(type);
    });
    if (cardArea === state.view.cardAreas.player) {
      card.onclick = e => handleDetails(pokelist[i]);
    }

    card.appendChild(name);
    card.appendChild(image);
    cardArea.appendChild(card);
  }
}
function handleDetails(card) {
  if (card) {
    state.view.detail.name.textContent = card.name;
    state.view.detail.height.innerHTML = `<svg style="width: 1rem; height:1rem" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M167.39,196.94a8,8,0,0,1-1.73,8.72l-32,32a8,8,0,0,1-11.32,0l-32-32A8,8,0,0,1,96,192h24V64H96a8,8,0,0,1-5.66-13.66l32-32a8,8,0,0,1,11.32,0l32,32A8,8,0,0,1,160,64H136V192h24A8,8,0,0,1,167.39,196.94Z"></path></svg> ${card.height}`;
    state.view.detail.weight.innerHTML = `<svg style="width: 1rem; height:1rem" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M244,116V88a20,20,0,0,0-20-20H208V64a20,20,0,0,0-20-20H164a20,20,0,0,0-20,20v52H112V64A20,20,0,0,0,92,44H68A20,20,0,0,0,48,64v4H32A20,20,0,0,0,12,88v28a12,12,0,0,0,0,24v28a20,20,0,0,0,20,20H48v4a20,20,0,0,0,20,20H92a20,20,0,0,0,20-20V140h32v52a20,20,0,0,0,20,20h24a20,20,0,0,0,20-20v-4h16a20,20,0,0,0,20-20V140a12,12,0,0,0,0-24ZM36,164V92H48v72Zm52,24H72V68H88Zm96,0H168V68h16Zm36-24H208V92h12Z" opacity="0.8"></path></svg> ${card.weight}`;
    state.view.detail.types.innerHTML = "";
    state.view.detail.card.classList = ["card-detail"],
    card.types.forEach((type) => {
      state.view.detail.card.classList.add(type)
      const typeDiv = document.createElement('div');
      typeDiv.classList.add('type');
      typeDiv.innerHTML = state.view.types[type];
      state.view.detail.types.appendChild(typeDiv);
    });
    state.view.detail.hp.textContent = card.hp;
    state.view.detail.speed.textContent = card.speed;
    state.view.detail.attack.textContent = card.attack;
    state.view.detail.defense.textContent = card.defense;
    state.view.detail.image.src = card.image;
    state.view.detail.image.alt = card.name;
  } else {
    state.view.detail.name.textContent = "nome";
    state.view.detail.height.innerHTML = `<svg style="width: 1rem; height:1rem" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M167.39,196.94a8,8,0,0,1-1.73,8.72l-32,32a8,8,0,0,1-11.32,0l-32-32A8,8,0,0,1,96,192h24V64H96a8,8,0,0,1-5.66-13.66l32-32a8,8,0,0,1,11.32,0l32,32A8,8,0,0,1,160,64H136V192h24A8,8,0,0,1,167.39,196.94Z"></path></svg> altura`;
    state.view.detail.weight.innerHTML = `<svg style="width: 1rem; height:1rem" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M244,116V88a20,20,0,0,0-20-20H208V64a20,20,0,0,0-20-20H164a20,20,0,0,0-20,20v52H112V64A20,20,0,0,0,92,44H68A20,20,0,0,0,48,64v4H32A20,20,0,0,0,12,88v28a12,12,0,0,0,0,24v28a20,20,0,0,0,20,20H48v4a20,20,0,0,0,20,20H92a20,20,0,0,0,20-20V140h32v52a20,20,0,0,0,20,20h24a20,20,0,0,0,20-20v-4h16a20,20,0,0,0,20-20V140a12,12,0,0,0,0-24ZM36,164V92H48v72Zm52,24H72V68H88Zm96,0H168V68h16Zm36-24H208V92h12Z" opacity="0.8"></path></svg> peso`;
    state.view.detail.types.innerHTML = "tipos";
    state.view.detail.card.classList = ["card-detail"],

    state.view.detail.hp.textContent = "hp";
    state.view.detail.speed.textContent = "rapidez";
    state.view.detail.attack.textContent = "ataque";
    state.view.detail.defense.textContent = "defesa";
    state.view.detail.image.src = "./src/images/cartoon-pokeball-sticker.png";
    state.view.detail.image.alt = "imagem";
  }
}
function handleInField() {
  if ((state.view.detail.name.textContent !== "nome")) {
    state.action.pokemonSelector.disabled = true;
    state.view.fieldCard.player.innerHTML = "";
    const cards = Array.from(document.querySelectorAll(`.your-card`));
    const card = cards.find(card => card.key === state.view.detail.name.textContent);
    
    state.values.playerPokemonInField = state.values.playerPokemonList.find(poke => poke.name === state.view.detail.name.textContent);
    state.view.fieldCard.player.innerHTML = card.innerHTML;
    state.view.fieldCard.player.classList = card.classList;
  
    checkComparisonRquirements()
  }
}
function enemyPokeInField() {
  state.view.fieldCard.enemy.innerHTML = "";
  const cards = Array.from(document.querySelectorAll(`.enemy-card`));
  const randomId = Math.floor(Math.random()*cards.length);
  const card = cards[randomId];

  state.view.fieldCard.enemy.innerHTML = card.innerHTML;
  state.view.fieldCard.enemy.classList = card.classList;
  state.view.fieldCard.enemy.classList.remove ("enemy-card");
  state.view.fieldCard.enemy.classList.add ("your-card");

  state.values.enemyPokemonInField = state.values.enemyPokemonList[randomId]
}
function randomAttribute() {
  const randomId = Math.floor(Math.random()*state.values.attributes.length);
  state.values.attributeSelected = state.values.attributes[randomId];
  state.view.attribute.duel.innerHTML = state.view.svg[state.values.attributes[randomId]];
}
function whoStarts() {
  state.values.playingOrder = (Math.random()>.5)?["player", "enemy"]:["enemy", "player"];
}
function handleTurn() {
  state.view.turn[state.values.playingOrder[state.values.roundsPlayed % state.values.playingOrder.length]].style.visibility = "visible";
  state.view.turn[state.values.playingOrder[(state.values.roundsPlayed +1) % state.values.playingOrder.length]].style.visibility = "hidden";
  
  if (state.values.playingOrder[state.values.roundsPlayed % state.values.playingOrder.length] === "enemy") {
    const optionUnchecked = document.querySelectorAll('input[type="radio"]');
    optionUnchecked.forEach(option => option.disabled = true);
    state.action.attributeSelector.disabled = true;
    randomAttribute();
    enemyPokeInField();
  } else if (state.values.playingOrder[state.values.roundsPlayed % state.values.playingOrder.length] === "player") {
    const optionUnchecked = document.querySelectorAll('input[type="radio"]');
    optionUnchecked.forEach(option => option.disabled = false);
    state.action.attributeSelector.disabled = false;
  }
}
function cleanRound() {
  state.values.roundsPlayed++;
  state.values.attributeSelected=null;
  state.values.playerPokemonInField=null;
  state.values.enemyPokemonInField=null;
  const playerFieldToClean =document.querySelector(".duel-box :nth-child(2)")
  playerFieldToClean.classList = "your-poke-card"
  playerFieldToClean.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-dotted" viewBox="0 0 16 16">
    <path d="M8 0c-.176 0-.35.006-.523.017l.064.998a7.117 7.117 0 0 1 .918 0l.064-.998A8.113 8.113 0 0 0 8 0M6.44.152c-.346.069-.684.16-1.012.27l.321.948c.287-.098.582-.177.884-.237L6.44.153zm4.132.271a7.946 7.946 0 0 0-1.011-.27l-.194.98c.302.06.597.14.884.237l.321-.947zm1.873.925a8 8 0 0 0-.906-.524l-.443.896c.275.136.54.29.793.459l.556-.831zM4.46.824c-.314.155-.616.33-.905.524l.556.83a7.07 7.07 0 0 1 .793-.458zM2.725 1.985c-.262.23-.51.478-.74.74l.752.66c.202-.23.418-.446.648-.648l-.66-.752zm11.29.74a8.058 8.058 0 0 0-.74-.74l-.66.752c.23.202.447.418.648.648l.752-.66m1.161 1.735a7.98 7.98 0 0 0-.524-.905l-.83.556c.169.253.322.518.458.793l.896-.443zM1.348 3.555c-.194.289-.37.591-.524.906l.896.443c.136-.275.29-.54.459-.793l-.831-.556zM.423 5.428a7.945 7.945 0 0 0-.27 1.011l.98.194c.06-.302.14-.597.237-.884l-.947-.321zM15.848 6.44a7.943 7.943 0 0 0-.27-1.012l-.948.321c.098.287.177.582.237.884l.98-.194zM.017 7.477a8.113 8.113 0 0 0 0 1.046l.998-.064a7.117 7.117 0 0 1 0-.918l-.998-.064zM16 8a8.1 8.1 0 0 0-.017-.523l-.998.064a7.11 7.11 0 0 1 0 .918l.998.064A8.1 8.1 0 0 0 16 8M.152 9.56c.069.346.16.684.27 1.012l.948-.321a6.944 6.944 0 0 1-.237-.884l-.98.194zm15.425 1.012c.112-.328.202-.666.27-1.011l-.98-.194c-.06.302-.14.597-.237.884l.947.321zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a6.999 6.999 0 0 1-.458-.793l-.896.443zm13.828.905c.194-.289.37-.591.524-.906l-.896-.443c-.136.275-.29.54-.459.793l.831.556zm-12.667.83c.23.262.478.51.74.74l.66-.752a7.047 7.047 0 0 1-.648-.648l-.752.66zm11.29.74c.262-.23.51-.478.74-.74l-.752-.66c-.201.23-.418.447-.648.648l.66.752m-1.735 1.161c.314-.155.616-.33.905-.524l-.556-.83a7.07 7.07 0 0 1-.793.458l.443.896zm-7.985-.524c.289.194.591.37.906.524l.443-.896a6.998 6.998 0 0 1-.793-.459l-.556.831zm1.873.925c.328.112.666.202 1.011.27l.194-.98a6.953 6.953 0 0 1-.884-.237l-.321.947zm4.132.271a7.944 7.944 0 0 0 1.012-.27l-.321-.948a6.954 6.954 0 0 1-.884.237l.194.98zm-2.083.135a8.1 8.1 0 0 0 1.046 0l-.064-.998a7.11 7.11 0 0 1-.918 0l-.064.998zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
  </svg>`
  const enemyFieldToClean =document.querySelector(".duel-box :nth-child(4)")
  enemyFieldToClean.classList = "enemy-poke-card"
  enemyFieldToClean.innerHTML = ""
  state.action.pokemonSelector.disabled = false;
  
}
function handleAttribute() {
  const option = document.querySelector("input:checked");
  const optionUnchecked = document.querySelectorAll('input[type="radio"]');

  optionUnchecked.forEach(option => option.disabled = true);

  state.values.attributeSelected = option.value;
  
  state.action.attributeSelector.disabled = true;

  state.view.attribute.duel.innerHTML = state.view.svg[option.value];
  checkComparisonRquirements()
}
function endGame() {
  if (state.values.playerScore>=state.values.numberOfCards) {
    state.view.result.page.style.display = "flex";
    state.view.result.message.textContent = "Parabéns, você venceu!";
    return true
  } else if (state.values.enemyScore>=state.values.numberOfCards) {
    state.view.result.page.style.display = "flex";
    state.view.result.message.textContent = "Que pena, você perdeu...";
    return true
  } else {
    return false
  }
}
function comparison() {
  let isEndGame;
  if (state.values.playerPokemonInField[state.values.attributeSelected] > state.values.enemyPokemonInField[state.values.attributeSelected]) {
    state.values.playerScore++;
    isEndGame = endGame();
    
    state.view.score.player.textContent = state.values.playerScore;
    const cards = Array.from(document.querySelectorAll(".enemy-cards .enemy-card"));
    const card = cards.find(card => card.key === state.values.enemyPokemonInField.name);
    if (card){
      card.innerHTML = ""
      card.classList = ["defeated-card"];
      card.onclick = null;
    }
  } else if (state.values.playerPokemonInField[state.values.attributeSelected] < state.values.enemyPokemonInField[state.values.attributeSelected]) {
    state.values.enemyScore++;
    isEndGame = endGame();
    handleDetails()
    
    state.view.score.enemy.textContent = state.values.enemyScore;    
    const cards = Array.from(document.querySelectorAll(".your-cards .your-card"));
    const card = cards.find(card => card.key === state.values.playerPokemonInField.name);
    if (card){
      card.innerHTML = ""
      card.classList = ["defeated-card"];
      card.onclick = null;
    }

  }
  if (!isEndGame) {
    setTimeout(() => {cleanRound(); handleTurn()}, 1500);
  }
}
function checkComparisonRquirements() {
  if (state.view.fieldCard.player.classList.contains("your-poke-card")) return false
  if ((state.values.attributeSelected === null)) return false
  if (state.view.fieldCard.enemy.classList.contains("enemy-poke-card")) {
    enemyPokeInField()
  }
  comparison()
}
async function init() {
  state.view.result.page.style.display = "none";
  state.values.enemyPokemonList = await cardInHandGenerator();
  createCards(state.values.enemyPokemonList, state.view.cardAreas.enemy, "enemy-card");
  state.values.playerPokemonList = await cardInHandGenerator();
  createCards(state.values.playerPokemonList, state.view.cardAreas.player, "your-card");

  handleDetails();

  state.action.attributeSelector.addEventListener("click", () => handleAttribute());
  state.action.pokemonSelector.addEventListener("click", () => handleInField());
  whoStarts();
  handleTurn();

}

init();