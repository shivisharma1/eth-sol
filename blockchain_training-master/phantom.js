const btn1 = document.getElementById("btn1");
const PNM = document.getElementById("netWork");


function getBalancee(number){
    let provider = window.solana;
        let connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl(number), 'confirmed');
        connection.getBalance(provider.publicKey).then(function (value) {
        console.log("Balance: " + (value/1000000000) + " SOL");
        var result = value/1000000000;
        document.getElementsByName('displaybalance')[0].value = result + "  SOL";

        });
  }

netWork.onchange = () => {
    let btn1id =  PNM.value;
    getBalancee(btn1id);
    document.getElementsByName('displaytransactionid')[0].value = " ";

  } 


const btn4 = document.getElementById("btn4");
const phantomNetworkNumber1 = document.getElementById("netWork");
const phantomReceiver = document.getElementById("phantomreceiver");
const phantomAmount = document.getElementById("quantity");

var senderKey = null;


//Transaction function starts here!

async function transferSOL(number,receiver,val) {

    // Detecting and storing the phantom wallet of the user (creator in this case)
    let provider = window.solana;
    if(val<= 0 || val == -0){
      alert("Please input a value greater than 0");
      return;
      }

      const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl(number),"confirmed");
      let bal = await connection.getBalance(provider.publicKey);
      bal = bal/1000000000;
      console.log("Bal ==> ",bal);
      if(val> bal)
      {
        alert("Balance insufficient");
        return;
      }

    // Detecting and storing the phantom wallet of the user (creator in this case)
    senderKey = provider.publicKey.toString();
    console.log("Public key of the sender: ",provider.publicKey.toString());
    // Establishing connection

    console.log(connection);
    value = connection.getBalance(provider.publicKey);
    value = value/1000000000;

        try{  
        var recieverWallet = new solanaWeb3.PublicKey(receiver);
        console.log(recieverWallet);
        if(senderKey == recieverWallet)
          {
        alert("You cannot send money to your own wallet");
        return;
          }
        }
        catch{
        alert("Invalid Wallet Address!");
        }

      //Airdrop
      try{
        var airdropSignature = await connection.requestAirdrop(provider.publicKey,1000,);
        // Confirming that the airdrop went through
        await connection.confirmTransaction(airdropSignature);
        console.log("Airdropped");
      }
      catch(err){
        alert(err.message);
      }

      var transaction = new solanaWeb3.Transaction().add(
      solanaWeb3.SystemProgram.transfer({
      fromPubkey: provider.publicKey,
      toPubkey: recieverWallet,
      lamports: val*1000000000 //Investing 1 SOL. Remember 1 Lamport = 10^-9 SOL.
        }),
      );

      // Setting the variables for the transaction
      transaction.feePayer = await provider.publicKey;
      let blockhashObj = await connection.getRecentBlockhash();
      transaction.recentBlockhash = await blockhashObj.blockhash;

      // Transaction constructor initialized successfully
      try{
        if(transaction) {
        console.log("Txn created successfully");
        }
        // Request creator to sign the transaction (allow the transaction)
     
        let signed = await provider.signTransaction(transaction);

        // The signature is generated
        
        let signature = await connection.sendRawTransaction(signed.serialize());
        // Confirm whether the transaction went through or not
        await connection.confirmTransaction(signature);

        //Signature chhap diya idhar
        var result = signature;
        document.getElementsByName('displaytransactionid')[0].value = result;
        console.log("Signature: ", signature);
        alert("Transaction was carried out successfully! Your Balance is Updated!");

        // updating balance field again
        let btn1id =  PNM.value;
        getBalancee(btn1id);
      }
      
       catch(err) {
       alert(err.message);
          }

  }
  
  btn4.onclick = () => {
    let number4 = phantomNetworkNumber1.value;
    let receiver = phantomReceiver.value;
    let solamount = phantomAmount.value;
    transferSOL(number4,receiver,solamount);
}

  clear.onclick = () => {
  document.getElementById('phantomreceiver').value = "";
  document.getElementById('quantity').value = "";
  document.getElementsByName('displaytransactionid')[0].value = "";
}

const btn = document.getElementById('btn9');

btn.addEventListener('click', () => {
// hide button
btn.style.display = 'none';
});









































// var PNM = document.getElementById("netWork");
// let c = PNM.value;


// async function getBalancee(c){
//         let provider = window.solana;
//         let connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl(c),'confirmed');
//         connection.getBalance(provider.publicKey).then(function (value) {
//         const result = value/1000000000;
//         console.log("Balance: " + (result) + " SOL");
//         document.getElementsByName('displaybalance')[0].value = result + "  SOL";
        
//         });
//   }

// netWork.onchange = () => { 
//   let btn1id =  PNM.value
//   getBalancee(btn1id);
//   document.getElementsByName('displaytransactionid')[0].value = "";

//   } 


// const btn4 = document.getElementById("btn4");
// const phantomNetworkNumber1 = document.getElementById("netWork");
// const phantomReceiver = document.getElementById("phantomreceiver");
// const phantomAmount = document.getElementById("quantity");



// var senderKey = null;

// async function transferSOL(number,receiver,val) {
//   let provider = window.solana;
//     if(val< 0){
//       alert("Please input a valid amount");
//       return;
//       }
 
//       const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl(c),"confirmed");
//       let bal = await connection.getBalance(provider.publicKey)
//       bal = bal/1000000000;
//       console.log("Bal ==> ",bal);
//       if(val> bal)
//       {
//         alert("Balance insufficient")
//         return;
//       }

//     // Detecting and storing the phantom wallet of the user (creator in this case)
//     // let provider = window.solana;
//     senderKey = provider.publicKey.toString();
//     console.log("Public key of the sender: ",provider.publicKey.toString());
//     // Establishing connection


//     console.log(connection);
//     value = connection.getBalance(provider.publicKey);
//     value = value/1000000000;

//     try{  
//     var recieverWallet = new solanaWeb3.PublicKey(receiver);
//     if(senderKey == recieverWallet)
//       {
//     alert("You cannot send money to your own wallet");
//     return;
//       }
//     }
//     catch{
//     alert("Invalid Wallet Address!");
//     }
  

//     // Airdrop some SOL to the sender's wallet, so that it can handle the txn fee. This will confirm that you can send and receive tokens on your wallet type of choice.
//     try{
//       var airdropSignature = await connection.requestAirdrop(
//       provider.publicKey,
//       1000,
//       );
//       // Confirming that the airdrop went through
//       await connection.confirmTransaction(airdropSignature);
//       console.log("Airdropped");
//       }
//       catch(err){
//       alert(err.message);
//     }

    
//     var transaction = new solanaWeb3.Transaction().add(
//     solanaWeb3.SystemProgram.transfer({
//     fromPubkey: provider.publicKey,
//     toPubkey: recieverWallet,
//     lamports: val*1000000000 //Investing 1 SOL. Remember 1 Lamport = 10^-9 SOL.
//     }
//       ),
//         );

//     // Setting the variables for the transaction
//     transaction.feePayer = await provider.publicKey;
//     let blockhashObj = await connection.getRecentBlockhash();
//     transaction.recentBlockhash = await blockhashObj.blockhash;

//     // Transaction constructor initialized successfully
//     try{
//     if(transaction) {
//     console.log("Txn created successfully");
//     }
    
//     // Request creator to sign the transaction (allow the transaction)
    
//     let signed = await provider.signTransaction(transaction);
    

//     // The signature is generated
    
//     let signature = await connection.sendRawTransaction(signed.serialize());
//     // Confirm whether the transaction went through or not
//     await connection.confirmTransaction(signature);

//     //Signature chhap diya idhar
//     var result = signature;
//     document.getElementsByName('displaytransactionid')[0].value = result;
//     console.log("Signature: ", signature);
//     alert("Transaction was carried out successfully! Your Balance is Updated!");

//     // updating balance field again
//     let btn1id =  PNM.value;
//     getBalancee(btn1id);
//     }

//     catch(e){
//     alert(e.message);
//     }
// }
  
  
//   btn4.onclick = () => {
//   let number4 = phantomNetworkNumber1.value;
//   let receiver = phantomReceiver.value;
//   let solamount = phantomAmount.value; 
//   transferSOL(number4,receiver,solamount);
// }


//   clear.onclick = () => {
//   document.getElementById('phantomreceiver').value = "";
//   document.getElementById('quantity').value = "";
//   document.getElementsByName('displaytransactionid')[0].value = "";
// }


// const btn = document.getElementById('btn9');

// btn.addEventListener('click', () => {
// // hide button
// btn.style.display = 'none';
// });
