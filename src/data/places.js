const DESTINATION_PLACES = {
  delhi: [
    { id: 201, name: 'Taj Mahal of Delhi (Red Fort)', desc: 'Iconic Mughal architecture and historic fort complex.', images: ['https://source.unsplash.com/900x600/?redfort,delhi'], tags: ['Heritage','History'], category: 'heritage', rating: 4.6, bestMonths: 'Oct–Mar' },
    { id: 202, name: 'Qutub Minar', desc: 'A 73m high victory tower with intricate carvings.', images: ['https://source.unsplash.com/900x600/?qutubminar'], tags: ['Heritage'], category: 'heritage', rating: 4.7, bestMonths: 'Nov–Feb' },
    { id: 203, name: 'India Gate & Rajpath', desc: 'War memorial and central ceremonial boulevard.', images: ['https://source.unsplash.com/900x600/?india-gate'], tags: ['Monument','Vibe'], category: 'chill', rating: 4.5, bestMonths: 'All Year' },
    { id: 204, name: 'Lotus Temple', desc: 'Baháʼí House of Worship with calm gardens.', images: ['https://source.unsplash.com/900x600/?lotus-temple'], tags: ['Spiritual'], category: 'chill', rating: 4.5, bestMonths: 'All Year' },
    { id: 205, name: 'Humayun\'s Tomb', desc: 'Precursor to the Taj Mahal — beautiful gardens and mausoleum.', images: ['https://source.unsplash.com/900x600/?humayunstomb'], tags: ['Heritage'], category: 'heritage', rating: 4.6, bestMonths: 'Oct–Mar' }
  ],
  mumbai: [
    { id: 301, name: 'Gateway of India', desc: 'Historic waterfront arch and city landmark.', images: ['https://source.unsplash.com/900x600/?gateway-of-india,mumbai'], tags: ['Iconic'], category: 'heritage', rating: 4.7 },
    { id: 302, name: 'Marine Drive', desc: 'Scenic seafront promenade ideal at sunset.', images: ['https://source.unsplash.com/900x600/?marine-drive,mumbai'], tags: ['Scenic'], category: 'chill', rating: 4.8 },
    { id: 303, name: 'Elephanta Caves', desc: 'Island caves with ancient rock-cut temples.', images: ['https://source.unsplash.com/900x600/?elephanta-caves'], tags: ['UNESCO','Heritage'], category: 'heritage', rating: 4.5 },
    { id: 304, name: 'Colaba Causeway', desc: 'Bustling market street with cafes and shopping.', images: ['https://source.unsplash.com/900x600/?colaba-causeway'], tags: ['Market'], category: 'chill', rating: 4.3 },
    { id: 305, name: 'Sanjay Gandhi National Park', desc: 'Large urban national park with Kanheri caves.', images: ['https://source.unsplash.com/900x600/?sanjay-gandhi-park'], tags: ['Nature'], category: 'adventure', rating: 4.4 }
  ],
  bengaluru: [
    { id: 401, name: 'Lalbagh Botanical Garden', desc: 'Historic botanical garden with glasshouse.', images: ['https://source.unsplash.com/900x600/?lalbagh,bengaluru'], tags: ['Garden'], category: 'chill', rating: 4.6 },
    { id: 402, name: 'Bangalore Palace', desc: 'Tudor-style palace with ornate interiors.', images: ['https://source.unsplash.com/900x600/?bangalore-palace'], tags: ['Heritage'], category: 'heritage', rating: 4.3 },
    { id: 403, name: 'Cubbon Park', desc: 'Green lung of the city with wide avenues.', images: ['https://source.unsplash.com/900x600/?cubbon-park'], tags: ['Park'], category: 'chill', rating: 4.4 },
    { id: 404, name: 'ISKCON Temple', desc: 'Large cultural complex and temple.', images: ['https://source.unsplash.com/900x600/?iskcon-bangalore'], tags: ['Spiritual'], category: 'heritage', rating: 4.2 },
    { id: 405, name: 'Nandi Hills', desc: 'Popular sunrise viewpoint just outside the city.', images: ['https://source.unsplash.com/900x600/?nandi-hills'], tags: ['Scenic'], category: 'adventure', rating: 4.5 }
  ],
  chennai: [
    { id: 501, name: 'Marina Beach', desc: 'One of the longest urban beaches in the world.', images: ['https://source.unsplash.com/900x600/?marina-beach,chennai'], tags: ['Beach'], category: 'chill', rating: 4.3 },
    { id: 502, name: 'Kapaleeshwarar Temple', desc: 'Ancient Dravidian architecture in Mylapore.', images: ['https://source.unsplash.com/900x600/?kapaleeshwarar-temple'], tags: ['Heritage'], category: 'heritage', rating: 4.4 },
    { id: 503, name: 'Fort St. George', desc: 'Historic fort and museum.', images: ['https://source.unsplash.com/900x600/?fort-st-george'], tags: ['History'], category: 'heritage', rating: 4.1 },
    { id: 504, name: 'Santhome Basilica', desc: 'Gothic-style church on the coast.', images: ['https://source.unsplash.com/900x600/?santhome-basilica'], tags: ['Heritage'], category: 'heritage', rating: 4.0 },
    { id: 505, name: 'Mahabalipuram (nearby)', desc: 'UNESCO shore temples and rock carvings.', images: ['https://source.unsplash.com/900x600/?mahabalipuram'], tags: ['UNESCO'], category: 'heritage', rating: 4.6 }
  ],
  kolkata: [
    { id: 601, name: 'Victoria Memorial', desc: 'Grand marble monument and museum.', images: ['https://source.unsplash.com/900x600/?victoria-memorial,kolkata'], tags: ['Heritage'], category: 'heritage', rating: 4.5 },
    { id: 602, name: 'Howrah Bridge', desc: 'Iconic cantilever bridge over the Hooghly.', images: ['https://source.unsplash.com/900x600/?howrah-bridge'], tags: ['Iconic'], category: 'chill', rating: 4.3 },
    { id: 603, name: 'Dakshineswar Kali Temple', desc: 'Famous temple on the Hooghly bank.', images: ['https://source.unsplash.com/900x600/?dakshineswar-temple'], tags: ['Spiritual'], category: 'heritage', rating: 4.4 },
    { id: 604, name: 'Indian Museum', desc: 'India\'s oldest museum with large collections.', images: ['https://source.unsplash.com/900x600/?indian-museum-kolkata'], tags: ['Museum'], category: 'heritage', rating: 4.2 },
    { id: 605, name: 'Park Street', desc: 'Lively street with restaurants and nightlife.', images: ['https://source.unsplash.com/900x600/?park-street-kolkata'], tags: ['Food','Vibe'], category: 'chill', rating: 4.0 }
  ],
  hyderabad: [
    { id: 701, name: 'Charminar', desc: 'Famous 16th-century mosque and monument.', images: ['https://source.unsplash.com/900x600/?charminar'], tags: ['Iconic'], category: 'heritage', rating: 4.6 },
    { id: 702, name: 'Golconda Fort', desc: 'Historic fortress with light-and-sound show.', images: ['https://source.unsplash.com/900x600/?golconda-fort'], tags: ['Fort'], category: 'heritage', rating: 4.5 },
    { id: 703, name: 'Hussain Sagar & Necklace Road', desc: 'Large lake with monolithic Buddha statue.', images: ['https://source.unsplash.com/900x600/?hussain-sagar'], tags: ['Scenic'], category: 'chill', rating: 4.2 },
    { id: 704, name: 'Ramoji Film City', desc: 'Massive film studio complex and theme park.', images: ['https://source.unsplash.com/900x600/?ramoji-film-city'], tags: ['Entertainment'], category: 'adventure', rating: 4.0 },
    { id: 705, name: 'Chowmahalla Palace', desc: 'Elegant palace complex of the Nizams.', images: ['https://source.unsplash.com/900x600/?chowmahalla-palace'], tags: ['Heritage'], category: 'heritage', rating: 4.4 }
  ],
  pune: [
    { id: 801, name: 'Aga Khan Palace', desc: 'Historic landmark linked to India\'s freedom movement.', images: ['https://source.unsplash.com/900x600/?aga-khan-palace'], tags: ['Heritage'], category: 'heritage', rating: 4.3 },
    { id: 802, name: 'Shaniwar Wada', desc: '18th-century fortification with ruins and gardens.', images: ['https://source.unsplash.com/900x600/?shaniwar-wada'], tags: ['History'], category: 'heritage', rating: 4.1 },
    { id: 803, name: 'Osho Ashram (Pune)', desc: 'Wellness and spiritual retreat in Koregaon Park.', images: ['https://source.unsplash.com/900x600/?osho-ashram'], tags: ['Wellness'], category: 'chill', rating: 4.0 },
    { id: 804, name: 'Sinhagad Fort', desc: 'Historic hill fortress and trekking spot.', images: ['https://source.unsplash.com/900x600/?sinhagad-fort'], tags: ['Trek'], category: 'adventure', rating: 4.4 },
    { id: 805, name: 'Pataleshwar Cave Temple', desc: 'Rock-cut ancient temple in the city.', images: ['https://source.unsplash.com/900x600/?pataleshwar-temple'], tags: ['Heritage'], category: 'heritage', rating: 4.0 }
  ],
  jaipur: [
    { id: 901, name: 'Amber Fort', desc: 'Hilltop fort with palace and mirror work.', images: ['https://source.unsplash.com/900x600/?amber-fort'], tags: ['Fort','Heritage'], category: 'heritage', rating: 4.7 },
    { id: 902, name: 'Hawa Mahal', desc: 'Palace of Winds with ornate façade.', images: ['https://source.unsplash.com/900x600/?hawa-mahal'], tags: ['Architecture'], category: 'heritage', rating: 4.5 },
    { id: 903, name: 'City Palace', desc: 'Royal residence with museums and courtyards.', images: ['https://source.unsplash.com/900x600/?city-palace-jaipur'], tags: ['Heritage'], category: 'heritage', rating: 4.4 },
    { id: 904, name: 'Jantar Mantar (Jaipur)', desc: 'Astronomical observatory with historic instruments.', images: ['https://source.unsplash.com/900x600/?jantar-mantar-jaipur'], tags: ['Science','History'], category: 'heritage', rating: 4.2 },
    { id: 905, name: 'Jal Mahal', desc: 'Picturesque palace in the middle of Man Sagar Lake.', images: ['https://source.unsplash.com/900x600/?jal-mahal'], tags: ['Scenic'], category: 'chill', rating: 4.1 }
  ],
  agra: [
    { id: 1001, name: 'Taj Mahal', desc: 'White-marble mausoleum and symbol of love.', images: ['https://source.unsplash.com/900x600/?taj-mahal,agra'], tags: ['Heritage'], category: 'heritage', rating: 4.9 },
    { id: 1002, name: 'Agra Fort', desc: 'Red-sandstone fort with palaces and gardens.', images: ['https://source.unsplash.com/900x600/?agra-fort'], tags: ['Heritage'], category: 'heritage', rating: 4.6 },
    { id: 1003, name: 'Fatehpur Sikri', desc: 'UNESCO city of red-sandstone monuments nearby.', images: ['https://source.unsplash.com/900x600/?fatehpur-sikri'], tags: ['UNESCO'], category: 'heritage', rating: 4.5 },
    { id: 1004, name: 'Mehtab Bagh', desc: 'Gardens with Taj views across the Yamuna.', images: ['https://source.unsplash.com/900x600/?mehtab-bagh'], tags: ['Scenic'], category: 'scenic', rating: 4.4 },
    { id: 1005, name: 'Itmad-ud-Daulah', desc: 'Known as the Baby Taj with intricate inlay work.', images: ['https://source.unsplash.com/900x600/?itmad-ud-daulah'], tags: ['Heritage'], category: 'heritage', rating: 4.3 }
  ],
  varanasi: [
    { id: 1101, name: 'Dashashwamedh Ghat', desc: 'Central ghat with evening Ganga aarti ceremonies.', images: ['https://source.unsplash.com/900x600/?varanasi-ghats'], tags: ['Spiritual'], category: 'heritage', rating: 4.7 },
    { id: 1102, name: 'Kashi Vishwanath Temple', desc: 'One of India\'s most revered temples.', images: ['https://source.unsplash.com/900x600/?kashi-vishwanath'], tags: ['Spiritual'], category: 'heritage', rating: 4.8 },
    { id: 1103, name: 'Sarnath', desc: 'Buddhist pilgrimage site where Buddha gave his first sermon.', images: ['https://source.unsplash.com/900x600/?sarnath'], tags: ['Heritage'], category: 'heritage', rating: 4.5 },
    { id: 1104, name: 'Manikarnika Ghat', desc: 'Historic cremation ghat on the Ganges.', images: ['https://source.unsplash.com/900x600/?manikarnika-ghat'], tags: ['Spiritual'], category: 'heritage', rating: 4.0 },
    { id: 1105, name: 'Ramnagar Fort', desc: 'Museum and palatial fort across the river.', images: ['https://source.unsplash.com/900x600/?ramnagar-fort'], tags: ['History'], category: 'heritage', rating: 4.1 }
  ]
};

export default DESTINATION_PLACES;
