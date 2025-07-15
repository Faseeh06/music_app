import { db } from '../config/firebase';
import { collection, addDoc, query, where, orderBy, limit, getDocs, serverTimestamp, doc, runTransaction, Timestamp } from 'firebase/firestore';

const RECENT_SEARCHES_COLLECTION = 'recentSearches';
const SEARCH_COUNTS_COLLECTION = 'searchCounts';

export interface RecentSearch {
  id: string;
  userId: string;
  term: string;
  searchedAt: Date;
}

export interface PopularSearch {
  id: string;
  term: string;
  count: number;
  lastSearched: Date;
}

/**
 * Adds a search term to the user's recent searches and increments the global search count.
 * @param userId The ID of the user performing the search.
 * @param term The search term.
 */
export const addSearchTerm = async (userId: string, term: string): Promise<void> => {
  if (!userId || !term.trim()) {
    return;
  }

  try {
    // Add to user's recent searches
    await addDoc(collection(db, RECENT_SEARCHES_COLLECTION), {
      userId,
      term: term.trim(),
      searchedAt: serverTimestamp(),
    });

    // Increment global search count for popular searches
    await incrementSearchCount(term.trim());
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
    return searches;
  } catch (error) {
    console.error("Error fetching recent searches: ", error);
    return [];
  }
};

/**
 * Increments the search count for a given term in the popular searches collection.
 * @param term The search term to increment.
 */
export const incrementSearchCount = async (term: string): Promise<void> => {
  if (!term.trim()) {
    return;
  }

  try {
    // Use the term itself as the document ID to avoid duplicates
    const searchDocRef = doc(db, SEARCH_COUNTS_COLLECTION, term.trim().toLowerCase());
    
    await runTransaction(db, async (transaction) => {
      const searchDoc = await transaction.get(searchDocRef);
      
      if (searchDoc.exists()) {
        // Document exists, increment count and update timestamp
        const currentCount = searchDoc.data().count || 0;
        transaction.update(searchDocRef, {
          count: currentCount + 1,
          lastSearched: serverTimestamp(),
        });
      } else {
        // Document doesn't exist, create it
        transaction.set(searchDocRef, {
          term: term.trim(),
          count: 1,
          lastSearched: serverTimestamp(),
        });
      }
    });
  } catch (error) {
    console.error("Error incrementing search count: ", error);
  }
};

/**
 * Fetches the most popular search terms from the last 7 days.
 * @returns A promise that resolves to an array of popular search objects.
 */
export const getPopularSearches = async (): Promise<PopularSearch[]> => {
  try {
    // Calculate the date 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const sevenDaysAgoTimestamp = Timestamp.fromDate(sevenDaysAgo);

    const q = query(
      collection(db, SEARCH_COUNTS_COLLECTION),
      where('lastSearched', '>=', sevenDaysAgoTimestamp),
      orderBy('lastSearched', 'desc'), // First order by lastSearched to use the index
      orderBy('count', 'desc'),
      limit(5)
    );

    const querySnapshot = await getDocs(q);
    const searches: PopularSearch[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      searches.push({
        id: doc.id,
        term: data.term,
        count: data.count,
        lastSearched: data.lastSearched.toDate(),
      });
    });

    // Sort by count in descending order since Firestore doesn't support multiple orderBy on different fields efficiently
    searches.sort((a, b) => b.count - a.count);

    console.log("Popular searches fetched:", searches);
    
    return searches.slice(0, 5); // Ensure we only return top 5
  } catch (error) {
    console.error("Error fetching popular searches: ", error);
    return [];
  }
};
