import * as Updates from "expo-updates";

const useUpdates = () => {
    async function onFetchUpdateAsync() {
        try {
          const update = await Updates.checkForUpdateAsync();
    
          if (update.isAvailable) {
            await Updates.fetchUpdateAsync();
            await Updates.reloadAsync();
          }
        } catch (error) {
          // alert(`Error fetching latest Expo update: ${error}`);
          console.log(error);
        }
      }

      return {
        onFetchUpdateAsync
      };

};


  export { useUpdates };