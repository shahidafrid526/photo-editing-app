const fileInput = document.querySelector(".file-imput");
const filterOptions = document.querySelectorAll(".filterops button");
const filterName = document.querySelector(".filter-info .name");
const filterSlider = document.querySelector(".slider input");
const filterValue = document.querySelector(".slider .value");
const chooseImgBtn = document.querySelector(".choose-img");
const previewImg = document.querySelector(".imgview img");
const InstaBtn = document.querySelector(".insta");
const resetFilterBtn = document.querySelector(".reset-filter");
const saveImgBtn = document.querySelector(".save-img");

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;

const applyFilters = ()=>{
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
}

const loadImage = () => {
  let file = fileInput.files[0];
  if (!file) return alert("No file selected.");
  console.log(file);

  previewImg.src = URL.createObjectURL(file);
};

filterOptions.forEach((option) => {
  option.addEventListener("click", () => {
    document.querySelector(".filterops .active-btn").classList.remove("active-btn");
    option.classList.add("active-btn");
    filterName.innerText = option.innerText;

    if(option.id === "brightness"){
        filterSlider.max = "200";
        filterSlider.value = brightness;
        filterValue.innerText = `${brightness}%`;
    }else if(option.id === "saturation"){
        filterSlider.max = "200";
        filterSlider.value = saturation;
        filterValue.innerText = `${saturation}%`;
    }else if(option.id === "inversion"){
        filterSlider.max = "100";
        filterSlider.value = inversion;
        filterValue.innerText = `${inversion}%`;
    }else{
        filterSlider.max = "100";
        filterSlider.value = grayscale;
        filterValue.innerText = `${grayscale}%`;
    }
  });
});

const updateFilter = ()=>{
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filterops .active-btn");

    if(selectedFilter.id === "brightness"){
        brightness = filterSlider.value;
    }else if(selectedFilter.id === "saturation"){
        saturation= filterSlider.value;
    }else if(selectedFilter.id === "inversion"){
        inversion= filterSlider.value;
    }else{
        grayscale = filterSlider.value;
    }
    applyFilters();
}

const resetFilter = ()=>{
    brightness = 100; saturation = 100; inversion = 0; grayscale = 0;
    applyFilters();
}

const InstaSize = ()=>{
    previewImg.style.maxWidth = "350px";
    previewImg.style.maxWidth = "350px";
    previewImg.style.objectFit = "cover";   
}

const saveImage = ()=>{
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;

    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width /2 , canvas.height /2);
    ctx.drawImage(previewImg, -canvas.width /2, -canvas.height /2, canvas.width, canvas.height);

    const Link = document.createElement("a");
    Link.download = "image.jpg";
    Link.href = canvas.toDataURL();
    Link.click();
}


fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter)
resetFilterBtn.addEventListener("click", resetFilter);
InstaBtn.addEventListener("click", InstaSize);
saveImgBtn.addEventListener("click", saveImage)
chooseImgBtn.addEventListener("click", () => fileInput.click());
