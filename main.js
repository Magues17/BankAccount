// BankAccount class - This class represents a bank account.

class BankAccount {
  constructor(accountNumber, owner) {
    //
    this.accountNumber = accountNumber;
    this.owner = owner;
    this.transactions = []; // initially set to empty array. this should hold transactions objects
  }

  /**
   * deposit an amount to the account
   * @param {*} amount
   */
  deposit(amt) {
    // prevent negative number deposits
    if (amt < 0) {
      return;
    } else {
      let newDeposit = new Transaction(amt);
      this.transactions.push(newDeposit);
    }
  }

  charge(amt, payee) {
    console.log("\nThe current balance of the user is: " + this.balance());
    console.log(
      "The amount that the user is trying to pay to the payee is: " + amt
    );
    let draftBalance = this.balance() + 50;
    console.log(
      "\nAdding 50$ to the user's current balance. Which makes draft amount equal to: " +
        draftBalance
    );
    if (this.balance() < amt) {
      console.log(
        "Balance is less than ammount, so check to see if the draft can cover it."
      );
      if (amt <= draftBalance) {
        console.log(
          "The draft can cover it! The ammount is less than or equal to the draft amount.\nIn this case, the amount is: " +
            amt +
            " and the draft amount is: " +
            draftBalance +
            ". Therfore, I'm going to have the bank cover it."
        );

        draftBalance =  amt - this.balance();
        //store this value isntead of adding 50$ each time, you need to add only the remaining amount. So if we did 10$ earlier, then it should be 40$.
        
        this.deposit(
          draftBalance,
          "Covering cost with draft amount of: " + draftBalance
        );
        console.log("The draft coverage is only: " + draftBalance + "\nMaking the user's new balance now equal to: " + this.balance());

        //Substract the amount from the draftbalance.
        //need to convert draftbalance to this newly subtracted balance.
        //say amount is 50$, and balance is 40$. Draftbalance would be 90$ (balance + 50$). Take the subtraction value from the amt and draftbalance and make that the new balance.
        //So draftbalance would be 40$ (balance) + 10 (amount needed to covered based on draftbalance - amount). THis would be the new draftbalance. (50$)
        //convert balance to new draftbalance value
        //run the charge
        //???
        //PROFIT
        amt = amt * -1;
        let charge = new Transaction(amt, payee);
        this.transactions.push(charge);
        console.log("covered charged with draft amount.");
      } else {
        return "Insufficent funds, purchase invalidated";
      }
    } else {
      amt = amt * -1;
      let charge = new Transaction(amt, payee);
      this.transactions.push(charge);
    }
  }

  /**
   *
   * @param {string} payee the person you are paying
   * @param {number} amount the amount you are paying
   */

  /**
   * Returns the current balance on the account
   */
  balance() {
    // initial balance should always be zero
    let balance = 0;

    // run through all tranasactions and adding/subtracting the totals of each transaction
    this.transactions.forEach((transaction) => {
      balance = balance + transaction.amount;
    });

    return balance;
  }
}

class Transaction {
  constructor(amount, payee) {
    this.date = new Date(); // The date of the transaction
    this.amount = amount; // The amount of the transaction. Positive amounts are money going into the account (deposit, refund). Negative amounts are money coming out of the account (a charge or debit).
    this.payee = payee; // The description or payee on the transaction
  }
}

let account = new BankAccount("9923452", "Kooper Henry");

console.log(account);

// balance on new accounts
account.balance(); // 0
account.deposit(100); //

//add some interest to the account. 7% is CRAZY GOOD.

///an example interest rate funciton

// get the balance
// multple that balance * the interest rate
//The best wy to do that is to conver the interest rate into a float value.
//As an example, 7% interest would be .07% (7 / 100);

// deposit(this.balance * .07); <-- interest rate added to the balance 
//How often does this deposit happen? monthly? Yearly? etc etc
//???
//profit
account.deposit(account.balance() * 0.07, "monthly interest rate deposit");
console.log("The interest rate gained by the user is: " +  account.balance() * .07);

console.log("My balance after first deposit", account.balance()); // 100

account.deposit(-100); // 100
console.log("Cannot do a negative deposit", account.balance());

// can charge to a vendor
account.charge(50, "Walmart");
console.log("My balance after groceries at Walmart", account.balance()); // 50

// cannot overcharge
account.charge(1000, "Furniture Store");
console.log("Cannont overcharge", account.balance()); // 50

// can do refunds
account.deposit(20, "Walmart");
console.log("I got a $20 refund for part of my groceries", account.balance()); // 70

console.log("My number of transactions is", account.transactions.length); // 3

//Banked can no cover with draft
account.charge(100000, "Home Purchase");
console.log(
  "Insufficant funds when trying to purchase a house at 100,000$. When the account balance is: " +
    account.balance()
);

//Banked covered with draft
account.charge(80, "Video Game");
console.log("Paid the cost of 80$ but the account with a draft from the bank. However, the user's bank account should be drained completely. The new user's balance is: ", account.balance());
console.log("I should also charge the user a 25$ overdraft fee. Making the user's bank account balance equal to -25$.");




