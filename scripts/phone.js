const loadPhone = async (searchText = 'a', isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
  const data = await res.json()
  const phones = data.data
  displayPhones(phones, isShowAll)
}
const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById('phone-container')
  phoneContainer.textContent = ''

  if (phones.length === 0) {
    phoneContainer.innerHTML = '<p class="text-center text-2xl text-[#1d1d1f] font-medium col-span-full py-8">No phones found. Please try a different search.</p>'
    loadingSpinner(false)
    return
  }

  const showAll = document.getElementById('show-all-container')
  if (phones.length > 4 && !isShowAll) {
    showAll.classList.remove('hidden')
  }
  else {
    showAll.classList.add('hidden')
  }

  if (!isShowAll) {
    phones = phones.slice(0, 4)
  }

  phoneContainer.classList = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto'

  phones.forEach(phone => {
    const phoneCard = document.createElement('div')
    phoneCard.classList = `card bg-[#fbfbfd] rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl h-full`
    phoneCard.innerHTML = `
        <figure class="relative overflow-hidden pt-8 px-4 h-[250px] flex items-center justify-center">
          <img src="${phone.image}" alt="${phone.phone_name}" class="w-auto h-full object-contain transition-transform duration-500 hover:scale-105"/>
        </figure>
        <div class="p-6 md:p-8 flex flex-col h-[calc(100%-250px)]">
          <h2 class="text-[#1d1d1f] text-xl md:text-2xl font-semibold mb-3">${phone.phone_name}</h2>
          <div class="relative flex-grow mb-4">
            <p class="text-[#86868b] text-sm md:text-base leading-relaxed line-clamp-3">Experience innovation at your fingertips with cutting-edge technology and exceptional design. This device showcases the perfect blend of style and functionality, offering an unparalleled mobile experience.</p>
            <button onclick="toggleReadMore(this)" class="text-[#0071e3] text-sm hover:underline mt-1">Read more</button>
          </div>
          <div class="flex flex-col gap-4 mt-auto">
            <p class="text-[#1d1d1f] text-lg md:text-xl font-medium">From $999</p>
            <button onclick="handleShowDetails('${phone.slug}')" 
              class="w-full bg-[#0071e3] text-white py-3 md:py-4 rounded-full text-sm md:text-base font-medium
              transition-all duration-300 hover:bg-[#0077ed] hover:shadow-lg
              active:transform active:scale-95">
              Learn more
            </button>
          </div>
        </div>
    `
    phoneContainer.appendChild(phoneCard)
  })
  loadingSpinner(false)
}

const toggleReadMore = (button) => {
  const paragraph = button.previousElementSibling;
  if (paragraph.classList.contains('line-clamp-3')) {
    paragraph.classList.remove('line-clamp-3');
    button.textContent = 'Read less';
  } else {
    paragraph.classList.add('line-clamp-3');
    button.textContent = 'Read more';
  }
}

const handleSearch = (isShowAll) => {
  loadingSpinner(true)
  const searchField = document.getElementById('search-field')
  const searchText = searchField.value
  loadPhone(searchText, isShowAll)
}

const loadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loadingIcon')
  if (isLoading) {
    loadingSpinner.classList.remove('hidden')
  }
  else {
    loadingSpinner.classList.add('hidden')
  }
}

const handleShowAll = () => {
  handleSearch(true)
}

const handleShowDetails = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json()
  const phone = data.data
  showDetails(phone)
}

const showDetails = (phone) => {
  const phoneName = document.getElementById('show-details-phone-name')
  phoneName.innerText = phone.name

  const showDetailsContainer = document.getElementById('show-details-container')
  showDetailsContainer.innerHTML = `
    <div class="p-6 md:p-8 lg:p-10 bg-[#fbfbfd] rounded-2xl">
      <img class="mx-auto mb-8 md:mb-10 max-w-[200px] md:max-w-[300px] lg:max-w-[400px] transition-transform duration-500 hover:scale-105" 
        src="${phone.image}" alt="${phone.name}">
      <div class="space-y-4 md:space-y-5 text-sm md:text-base">
        <p class="flex justify-between border-b border-gray-200 pb-2">
          <span class="text-[#1d1d1f] font-medium">Storage</span>
          <span class="text-[#86868b]">${phone?.mainFeatures?.storage || 'Not specified'}</span>
        </p>
        <p class="flex justify-between border-b border-gray-200 pb-2">
          <span class="text-[#1d1d1f] font-medium">Display</span>
          <span class="text-[#86868b]">${phone?.mainFeatures?.displaySize || 'Not specified'}</span>
        </p>
        <p class="flex justify-between border-b border-gray-200 pb-2">
          <span class="text-[#1d1d1f] font-medium">Chipset</span>
          <span class="text-[#86868b]">${phone?.mainFeatures?.chipSet || 'Not specified'}</span>
        </p>
        <p class="flex justify-between border-b border-gray-200 pb-2">
          <span class="text-[#1d1d1f] font-medium">Memory</span>
          <span class="text-[#86868b]">${phone?.mainFeatures?.memory || 'Not specified'}</span>
        </p>
        <p class="flex justify-between border-b border-gray-200 pb-2">
          <span class="text-[#1d1d1f] font-medium">Release Date</span>
          <span class="text-[#86868b]">${phone?.releaseDate || 'Coming soon'}</span>
        </p>
        <p class="flex justify-between border-b border-gray-200 pb-2">
          <span class="text-[#1d1d1f] font-medium">Brand</span>
          <span class="text-[#86868b]">${phone?.brand || 'Not specified'}</span>
        </p>
        <p class="flex justify-between border-b border-gray-200 pb-2">
          <span class="text-[#1d1d1f] font-medium">GPS</span>
          <span class="text-[#86868b]">${phone?.others?.GPS || 'No GPS'}</span>
        </p>
      </div>
    </div>
  `

  show_details_modal.showModal()
}

loadPhone()

document.addEventListener('DOMContentLoaded', function() {
  window.scrollTo(0, 0);
  
  document.getElementById('phoneX').style.display = 'none';
  document.getElementById('phoneCardX').style.display = 'none';
  document.getElementById('footerX').style.display = 'none';
  
  const welcomeSection = document.getElementById('welcomeX');
  const loadingSpinner = document.getElementById('loadingSpinner');
  const helloMessage = document.getElementById('helloMessage');
  const welcomeContent = document.getElementById('welcomeContent');
  
  welcomeSection.style.display = 'flex';
  
  setTimeout(() => {
      loadingSpinner.style.display = 'none';
      helloMessage.style.display = 'flex';
      welcomeContent.style.transform = 'scale(1)';
      
      setTimeout(() => {
          welcomeSection.style.display = 'none';
          document.getElementById('phoneX').style.display = 'block';
          document.getElementById('phoneCardX').style.display = 'block';
          document.getElementById('footerX').style.display = 'block';
      }, 3000);
  }, 2000);
});