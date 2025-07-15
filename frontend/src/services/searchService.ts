import { db } from '../config/firebase';
import { collection, addDoc, query, where, orderBy, limit, getDocs, serverTimestamp } from 'firebase/firestore';

const RECENT_SEARCHES_COLLECTION = 'recentSearches';

export interface RecentSearch {
  id: string;
  userId: string;
  term: string;
  searchedAt: Date;
}

/**
 * Adds a search term to the user's recent searches.
 * To prevent duplicates, we can consider checking if the exact term was recently searched.
 * For now, we'll keep it simple and add every search.
 * @param userId The ID of the user performing the search.
 * @param term The search term.
 */
export const addSearchTerm = async (userId: string, term: string): Promise<void> => {
  if (!userId || !term.trim()) {
    return;
  }

  try {
    await addDoc(collection(db, RECENT_SEARCHES_COLLECTION), {
      userId,
      term: term.trim(),
      searchedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error adding recent search: ", error);
    // Depending on requirements, you might want to throw the error
    // to be handled by the calling component.
  }
};

/**
 * Fetches the most recent search terms for a given user.
 * @param userId The ID of the user whose recent searches to fetch.
 * @returns A promise that resolves to an array of recent search objects.
 */
export const getRecentSearches = async (userId: string): Promise<RecentSearch[]> => {
  if (!userId) {
    return [];
  }

  try {
    const q = query(
      collection(db, RECENT_SEARCHES_COLLECTION),
      where('userId', '==', userId),
      orderBy('searchedAt', 'desc'),
      limit(5) // As requested, limit to 5 results
    );

    const querySnapshot = await getDocs(q);
    const searches: RecentSearch[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      searches.push({
        id: doc.id,
        userId: data.userId,
        term: data.term,
        searchedAt: data.searchedAt.toDate(),
      });
    });
    console.log("Recent searches fetched successfully:", searches);
    return searches;
  } catch (error) {
    console.error("Error fetching recent searches: ", error);
    return [];
  }
};
