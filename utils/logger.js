const getCurrentDateTime = () => {
    const now = new Date();
    // Options for formatting the date and time
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Jakarta', // Indonesia (WIB)
        hour12: false // Use 24-hour format
    };
    
    // Format date and time separately
 
    const time = now.toLocaleTimeString('en-US', options); // Get the time part

    return `${time}`; 
};

export const log = (message) => console.log(`[LOG][${getCurrentDateTime()}] ${message}`);
export const errorLogger = (message) => console.log(`[ERROR][${getCurrentDateTime()}] ${message} 💔`);