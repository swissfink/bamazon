# bamazon
An Amazon-like CLI app that uses MySQL to take in orders and deplete stock from the inventory.

## Customer View

1. In the corresponding MySQL bamazon databse, a products table contains the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)

2. This database currently contains 10 different products. (stapler, laptop computer, rubkis cube, wheelbarrow, rake, dog food, cat litter, yoyo, printer paper, and external hard drive).

3. A Node application called `bamazonCustomer.js`, when run, will display all of these items available for sale. Each item includes the id, name, and price of the product for sale.

    * **Example**
    ![alt text](https://github.com/swissfink/liri-node-app/blob/master/images/concert.gif "concert-this results gif") 

4. The app then prompt users with two messages.

   * The first message asks the user to select which product they would like to buy.

   * The second message asks them how many units of the product they would like to buy.

5. Once the user has placed the order, the application prints out a message affirming the user's selection and quantity AND how much this purchase will be (minus taxes and shipping).

    * **Example**
    ![alt text](https://github.com/swissfink/liri-node-app/blob/master/images/concert.gif "concert-this results gif") 

6. The user is then asked if they would like to continue with their purchase.

    * If the user selects "NO", the app takes the user back to the beginning and shows the main inventory list.

        * **Example**
        ![alt text](https://github.com/swissfink/liri-node-app/blob/master/images/concert.gif "concert-this results gif") 

    * If the user selects "YES", the application checks if there are enough units of the product currently in the inventory to meet the user's request.

        * If there are _NOT_ enough units, the app informs the user that there are not enough units to meet their request and redirects them back to the main inventory list.

        * **Example**
        ![alt text](https://github.com/swissfink/liri-node-app/blob/master/images/concert.gif "concert-this results gif") 

        * If there _ARE_ enough units, the user is informed that their purchase was successful and that their order is on its way. The user is then redirected back to the main inventory list.

        * **Example**
        ![alt text](https://github.com/swissfink/liri-node-app/blob/master/images/concert.gif "concert-this results gif") 

7. Whenver an order is successfully processed, then the bamazon MySQL database is updated to reflect the remaining quantity of whatever product was purchased.

* **Example**
![alt text](https://github.com/swissfink/liri-node-app/blob/master/images/concert.gif "concert-this results gif") 

## Manager View 

1. A separate Node application called `bamazonManager.js`, when run,  will prompt the user with two options:

    * "VIEW ALL PRODUCTS FOR SALE"
    
    * "VIEW ITEMS WITH LOW INVENTORY"

    * **Example**
    ![alt text](https://github.com/swissfink/liri-node-app/blob/master/images/concert.gif "concert-this results gif") 

2. If a manager selects `VIEW ALL PRODUCTS FOR SALE`, the app will list every available item: the item IDs, names, department, prices, and quantities.

    * **Example**
    ![alt text](https://github.com/swissfink/liri-node-app/blob/master/images/concert.gif "concert-this results gif") 

    * After the user selects this option, the app prompts the user to select an item they would like to adjust.

    * Once the user selects an item, the app prompts the user to enter how many more units of that item they would like to add to the inventory.

    * After the user submits their entry, the app displays the user's choices and prompts the user if they would like to continue with their adjustment.

        * If the user selects "NO", the app cancels out the adjustment and redirects the user back to the main inventory list.

        * **Example**
        ![alt text](https://github.com/swissfink/liri-node-app/blob/master/images/concert.gif "concert-this results gif") 

        * If the user selects "YES", the app updates the bamazon MySQL database with the user's entry, confirms if the update was successful, then redirects the user back to the start of the app.

        * **Example**
        ![alt text](https://github.com/swissfink/liri-node-app/blob/master/images/concert.gif "concert-this results gif") 

3. If a manager selects `VIEW ITEMS WITH LOW INVENTORY`, then the app  lists all items with an inventory count lower than five.

    * **Example**
    ![alt text](https://github.com/swissfink/liri-node-app/blob/master/images/concert.gif "concert-this results gif") 

    * After the user selects this option, the app prompts the user to select an item they would like to adjust.

    * Once the user selects an item, the app prompts the user to enter how many more units of that item they would like to add to the inventory.

    * After the user submits their entry, the app displays the user's choices and prompts the user if they would like to continue with their adjustment.

        * If the user selects "NO", the app cancels out the adjustment and redirects the user back to the low inventory list.

        * **Example**
        ![alt text](https://github.com/swissfink/liri-node-app/blob/master/images/concert.gif "concert-this results gif") 

        * If the user selects "YES", the app updates the bamazon MySQL database with the user's entry, confirms if the update was successful, then redirects the user back to the start of the app.

        * **Example**
        ![alt text](https://github.com/swissfink/liri-node-app/blob/master/images/concert.gif "concert-this results gif") 

---

Crafted with :heart: by [Richard Fink](https://swissfink.github.io/).