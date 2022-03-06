import database from '../firebase/firebase';

// Add reminder to firebase (use THUNK)
export const startAddReminder = (reminder, uid) => {

      return database.ref(`users/${uid}/reminders`).push({"text": reminder}).then((ref) => {
        console.log('posting data: ' + ref)
    
      });
    ;
  };

// Delete reminder from firebase

export const startRemoveReminder = (id, uid) => {
    return database.ref(`users/${uid}/reminders/${id}`).remove().then(() => {
    });
  };
;



// Set reminders from firebase when first render


export const startSetReminders = (uid, fn) => {
    return database.ref(`users/${uid}/reminders`).once('value').then((snapshot) => {
      const reminders = [];

      snapshot.forEach((childSnapshot) => {
        reminders.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      console.log(reminders)
      fn(reminders)
    });
  };


