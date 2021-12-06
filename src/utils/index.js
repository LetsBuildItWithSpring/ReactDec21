


export const readFile = (file) => {
    return new Promise((resolve, reject) => {
            const fReader = new FileReader();
            try {
                fReader.readAsDataURL(file);
                fReader.addEventListener('load', (ev) => {
                const { currentTarget: {result} } = ev;
                console.log("Result of file upload")
                console.log(result);
                resolve(result);
                });
            }
            catch (error){
                console.log(error);
                const newError = new Error("ERR_001: Can't read File");
                reject(newError)
            }
    });
}