import { db } from '@/services/firebase'
import { doc, getDoc } from 'firebase/firestore'

export const getUserSettings = async (userId: string) => {
    const docRef = doc(db, 'userSettings', userId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()){
        return docSnap
    }

    return null
    
}