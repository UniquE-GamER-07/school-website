const square = document.querySelector('.LinkTree');
LinkTree.classList.remove('LinkTree-animation');

//Create the Observer
const observer = new IntersectionObserver(entries =>
  {
    //Since it outputs an array, we loop over the entries
    entries.forEach(entry =>
      {
        //If the element is visible
        if(entry.isIntersecting)
        {
          LinkTree.classList.add('LinkTree-animation');
          return;
        }

        LinkTree.classList.remove('LinkTree-animation')

      });
  });

//Telling Observer which element to Track
observer.observe(document.querySelector('.expand-tree'));
