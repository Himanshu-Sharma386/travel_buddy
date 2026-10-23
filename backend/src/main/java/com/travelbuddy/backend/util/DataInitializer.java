package com.travelbuddy.backend.util;

import com.travelbuddy.backend.model.Destination;
import com.travelbuddy.backend.model.User;
import com.travelbuddy.backend.repository.DestinationRepository;
import com.travelbuddy.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {
    private final Set<String> addedNames = new HashSet<>();

    @Autowired
    private DestinationRepository destinationRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        destinationRepository.deleteAll();
        userRepository.deleteAll();
        
        // Create demo users
        try {
            User demoUser = new User();
            demoUser.setName("Demo User");
            demoUser.setEmail("demo@example.com");
            demoUser.setPassword("password123");
            userRepository.save(demoUser);
            
            User testUser = new User();
            testUser.setName("Test User");
            testUser.setEmail("test@example.com");
            testUser.setPassword("test123");
            userRepository.save(testUser);
            
            System.out.println("Demo users created successfully!");
        } catch (Exception e) {
            System.err.println("Error creating users: " + e.getMessage());
        }
        
        try {
            List<Destination> destinations = new ArrayList<>();
            
            // --- MONUMENTS & HERITAGE ---
            add(destinations, createDestination("Taj Mahal, Agra", "Heritage", 4.9, "Oct-Mar", "https://images.unsplash.com/photo-1564507592333-c60657eea523", 27.1751, 78.0421, "An ivory-white marble mausoleum on the right bank of the river Yamuna."));
            add(destinations, createDestination("Red Fort, Delhi", "Heritage", 4.6, "Oct-Mar", "https://images.unsplash.com/photo-1597756233593-74d440642117", 28.6562, 77.2410, "A historic fortified castle in the center of Delhi."));
            add(destinations, createDestination("Qutub Minar, Delhi", "Heritage", 4.8, "Oct-Mar", "https://images.unsplash.com/photo-1587595431973-160550652147", 28.5244, 77.1855, "The tallest brick minaret in the world."));
            add(destinations, createDestination("India Gate, Delhi", "Monument", 4.5, "Oct-Mar", "https://images.unsplash.com/photo-1597757228299-48de1502e4c5", 28.6129, 77.2295, "A war memorial dedicated to Indian soldiers."));
            add(destinations, createDestination("Mysore Palace", "Heritage", 4.7, "Oct-Mar", "https://images.unsplash.com/photo-1582510003544-4d00b7f74220", 12.3051, 76.6552, "A historical palace and royal residence in Karnataka."));
            add(destinations, createDestination("Hawa Mahal, Jaipur", "Heritage", 4.6, "Oct-Mar", "https://images.unsplash.com/photo-1599661046286-9c3cfb4e3da6", 26.9245, 75.8239, "Iconic pink five-story structure with 953 small windows."));
            add(destinations, createDestination("Amer Fort, Jaipur", "Heritage", 4.7, "Oct-Mar", "https://images.unsplash.com/photo-1590050752117-23a9d7fc240b", 26.9855, 75.8513, "Magnificent fort known for its artistic Hindu style elements."));
            add(destinations, createDestination("Hampi Ruins", "Heritage", 4.9, "Oct-Feb", "https://images.unsplash.com/photo-1600100397608-f010e423b971", 15.3350, 76.4600, "Ancient ruins of the Vijayanagara Empire."));
            add(destinations, createDestination("Konark Sun Temple", "Heritage", 4.8, "Nov-Feb", "https://images.unsplash.com/photo-1590733155786-689945089c84", 19.8876, 86.0945, "13th-century Sun Temple designed as a colossal chariot."));
            add(destinations, createDestination("Mahabalipuram Shore Temple", "Heritage", 4.7, "Nov-Feb", "https://images.unsplash.com/photo-1581340154030-9b4d0c5ab8c5", 12.6269, 80.1927, "Famous for its Shore Temple and open-air rock reliefs."));
            add(destinations, createDestination("Ajanta & Ellora Caves", "Heritage", 4.8, "Nov-Mar", "https://images.unsplash.com/photo-1599661046285-d3d3d3d3d3d3", 20.5519, 75.7031, "Ancient rock-cut Buddhist, Hindu and Jain caves."));

            // --- SPIRITUAL & RELIGIOUS ---
            add(destinations, createDestination("Golden Temple, Amritsar", "Spiritual", 4.9, "Oct-Mar", "https://images.unsplash.com/photo-1584061214451-d96706e57962", 31.6200, 74.8765, "The holiest Gurdwara of Sikhism."));
            add(destinations, createDestination("Varanasi Ghats", "Spiritual", 4.8, "Nov-Feb", "https://images.unsplash.com/photo-1561361513-2d000a50f0dc", 25.3176, 83.0062, "The spiritual capital of India on the Ganges."));
            add(destinations, createDestination("Meenakshi Temple, Madurai", "Spiritual", 4.7, "Oct-Mar", "https://images.unsplash.com/photo-1599661046285-b0b9d51d4e7a", 9.9252, 78.1198, "Ancient Hindu temple dedicated to Goddess Meenakshi."));
            add(destinations, createDestination("Vaishno Devi, Katra", "Spiritual", 4.8, "Jun-Sep", "https://images.unsplash.com/photo-1599661046285-ba2a9c1e7f0f", 32.9521, 75.3036, "Sacred shrine in the foothills of the Himalayas."));
            add(destinations, createDestination("Rameshwaram Temple", "Spiritual", 4.6, "Oct-Mar", "https://images.unsplash.com/photo-1599661046285-a1b8e5b3e6a9", 9.2876, 79.2740, "Sacred Hindu pilgrimage site with long corridors."));
            add(destinations, createDestination("Tirupati Balaji", "Spiritual", 4.9, "Sep-Mar", "https://images.unsplash.com/photo-1544102826-31032338f0d5", 13.6288, 79.4192, "Venkateswara Temple, one of the most visited shrines."));
            add(destinations, createDestination("Dwarkadhish Temple, Dwarka", "Spiritual", 4.8, "Oct-Mar", "https://images.unsplash.com/photo-1621255740445-6346d03403a4", 22.2442, 68.9685, "Ancient city associated with Lord Krishna."));
            add(destinations, createDestination("Har Ki Pauri, Haridwar", "Spiritual", 4.7, "Oct-Mar", "https://images.unsplash.com/photo-1590487988256-9ed24133863e", 29.9457, 78.1642, "Holy bank of the Ganges where the river enters the plains."));
            add(destinations, createDestination("Somnath Temple", "Spiritual", 4.8, "Oct-Mar", "https://images.unsplash.com/photo-1590050752117-23a9d7fc240b", 20.8880, 70.4012, "Site of the first of the twelve Jyotirlinga shrines."));

            // --- NATURE & HILL STATIONS ---
            add(destinations, createDestination("Srinagar - Dal Lake", "Nature", 4.9, "Apr-Oct", "https://images.unsplash.com/photo-1598305071114-175f6754b0bb", 34.0837, 74.7973, "Heaven on Earth with houseboats and Mughal gardens."));
            add(destinations, createDestination("Manali - Solang Valley", "Adventure", 4.7, "Mar-Jun", "https://images.unsplash.com/photo-1599661046285-a9e8b5e7f8b8", 32.2396, 77.1887, "Popular destination for trekking and paragliding."));
            add(destinations, createDestination("Shimla - The Ridge", "Hill Station", 4.6, "Mar-Jun", "https://images.unsplash.com/photo-1599661046285-ab3e0a7b5f8c", 31.7771, 77.1716, "Queen of Hills with colonial architecture."));
            add(destinations, createDestination("Munnar Tea Gardens", "Nature", 4.8, "Sep-Mar", "https://images.unsplash.com/photo-1593693397690-362cb9666fc2", 10.0889, 77.0595, "Lush green tea plantations and picturesque hills."));
            add(destinations, createDestination("Ooty - Nilgiris", "Nature", 4.6, "Oct-Jun", "https://images.unsplash.com/photo-1623945415752-646700c28384", 11.4102, 76.6950, "Scenic hill station famous for its toy train."));
            add(destinations, createDestination("Darjeeling Hills", "Nature", 4.7, "Mar-May", "https://images.unsplash.com/photo-1599661046285-e4a5ad6b3e2f", 27.0410, 88.2663, "Famous for tea gardens and Kanchenjunga views."));
            add(destinations, createDestination("Leh-Ladakh Passes", "Adventure", 4.9, "Jun-Sep", "https://images.unsplash.com/photo-1544102826-31032338f0d5", 34.1526, 77.5771, "High-altitude desert with stunning monasteries."));
            add(destinations, createDestination("Rishikesh Yoga", "Adventure", 4.8, "Oct-Apr", "https://images.unsplash.com/photo-1594993877167-a08f13013dc3", 30.0869, 78.2676, "Yoga capital and hub for white-water rafting."));

            // --- BEACHES & COASTAL ---
            add(destinations, createDestination("Goa Beaches - Baga", "Beach", 4.6, "Nov-Feb", "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2", 15.2993, 74.1240, "Famous for stunning coastline and vibrant nightlife."));
            add(destinations, createDestination("Kanyakumari Tip", "Beach", 4.7, "Oct-Mar", "https://images.unsplash.com/photo-1582510003544-4d00b7f74220", 8.0883, 77.5385, "Southernmost tip where three seas meet."));
            add(destinations, createDestination("Andaman Islands - Havelock", "Beach", 4.9, "Oct-May", "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d", 11.7401, 92.6586, "Pristine islands with turquoise waters and coral reefs."));
            add(destinations, createDestination("Kerala Backwaters - Alleppey", "Nature", 4.8, "Sep-Mar", "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944", 9.4981, 76.3388, "Network of brackish lagoons and houseboat cruises."));
            add(destinations, createDestination("Pondicherry - French Quarter", "Culture", 4.7, "Oct-Mar", "https://images.unsplash.com/photo-1589793907316-f94025b46850", 11.9416, 79.8083, "Former French colony with colorful colonial streets."));

            // --- CITIES & METROS ---
            add(destinations, createDestination("Delhi City", "Culture", 4.7, "Oct-Mar", "https://images.unsplash.com/photo-1587474260584-136574528ed5", 28.6139, 77.2090, "The capital city blending history and modernity."));
            add(destinations, createDestination("Mumbai - Marine Drive", "City", 4.8, "Oct-Mar", "https://images.unsplash.com/photo-1570160897040-30430ef2018a", 19.0760, 72.8777, "The city of dreams and Gateway of India."));
            add(destinations, createDestination("Jaipur - The Pink City", "Culture", 4.7, "Oct-Mar", "https://images.unsplash.com/photo-1599661046289-e31897846e41", 26.9124, 75.7873, "Known for its vibrant culture and royal forts."));
            add(destinations, createDestination("Ahmedabad - Sabarmati", "Culture", 4.6, "Nov-Feb", "https://images.unsplash.com/photo-1564507592333-c60657eaa0ae", 23.0225, 72.5714, "First UNESCO World Heritage City in India."));
            add(destinations, createDestination("Kochi - Fort Kochi", "Culture", 4.7, "Oct-Feb", "https://images.unsplash.com/photo-1595123550441-9367a3967f1e", 9.9312, 76.2673, "Historical port city with colonial charm."));
            add(destinations, createDestination("Udaipur - Lake Palace", "Royalty", 4.8, "Oct-Mar", "https://images.unsplash.com/photo-1590050752117-23a9d7fc240b", 24.5854, 73.7125, "The City of Lakes with lavish royal residences."));

            // --- WILDLIFE ---
            add(destinations, createDestination("Jim Corbett Park", "Wildlife", 4.7, "Nov-Jun", "https://images.unsplash.com/photo-1599661046285-c7c0c7c0c0c0", 29.5500, 79.4600, "Oldest national park famous for tiger safaris."));
            add(destinations, createDestination("Kaziranga National Park", "Wildlife", 4.8, "Nov-Apr", "https://images.unsplash.com/photo-1599661046285-d3d3d3d3d3d3", 26.5800, 93.2150, "Home to the great Indian one-horned rhinoceros."));

            destinationRepository.saveAll(destinations);
            System.out.println("Database seeded with " + destinations.size() + " unique Indian locations.");
        } catch (Exception e) {
            System.err.println("CRITICAL: Seeding failed: " + e.getMessage());
        }
    }

    private void add(List<Destination> list, Destination d) {
        if (d != null) list.add(d);
    }

    private Destination createDestination(String name, String category, Double rating, String bestTime, String imageUrl, Double lat, Double lon, String desc) {
        if (addedNames.contains(name)) return null;
        addedNames.add(name);
        Destination d = new Destination();
        d.setName(name);
        d.setCategory(category);
        d.setRating(rating);
        d.setBestTime(bestTime);
        d.setImageUrl(imageUrl);
        d.setLatitude(lat);
        d.setLongitude(lon);
        d.setDescription(desc);
        return d;
    }
}
