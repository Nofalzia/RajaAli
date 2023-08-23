      //Animation on Scroll

  const observer = new IntersectionObserver( (enteries) => {
    enteries.forEach((entry)=>{
        console.log(entry);
        if(entry.isIntersecting){
            entry.target.classList.add('animate__animated');
            entry.target.classList.add('show');
        }

    })
});



const hiddenelements = document.querySelectorAll('.hidden')
  hiddenelements.forEach((el)=> observer.observe(el));