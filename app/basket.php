<?php
header("Content-Type:application/json");
header("Access-Control-Allow-Origin: *");
include "config/database.php";
$myArray = array();

if ( isset($_GET) ) {
    switch( $_GET['action'] ) {
        case 'list':
            $sql = 'SELECT * FROM `prdbasket`';
            $result = mysqli_query( $con, $sql );
            while( $row = $result->fetch_array( MYSQLI_ASSOC ) ) {
                $myArray[] = $row;
            }
            break;
        case 'add':
            $prod_id = $_GET['prodId'];
            $prod_quantity = $_GET['quantity'];
            /* Check for the quantity since there's no change needed if it's 0 */
            if ( $prod_quantity == 0 ) {
                $myArray[] = 'No change to be done';
                return;
            }
            /* Get the product price from the `products` table because we don't pass it through arguments */
            $prod_price = mysqli_query( $con, 'SELECT price FROM products WHERE id=' . $prod_id )->fetch_array( MYSQLI_ASSOC )['price'];
            
            /* Chek if the product already exists in the basked */
            $existing_product = mysqli_query( $con, 'SELECT * FROM prdbasket WHERE prod_id=' . $prod_id )->fetch_array( MYSQLI_ASSOC );
            if ( $existing_product ) {
                /* If the product exists, update it with the new quantity */
                $prod_quantity += intval( $existing_product['qty'] );
                $total_price = floatval( $prod_price ) * $prod_quantity;
                $sql = 'UPDATE prdbasket
                        SET qty=' . $prod_quantity . ', total_price=' . $total_price . ' WHERE prod_id=' . $prod_id;
            } else {
                /* If the product doesn't exist, add it to the basket table */
                $total_price = floatval( $prod_price ) * $prod_quantity;
                $sql = 'INSERT INTO prdbasket (prod_id, prod_name, qty, total_price)
                        VALUES (' . $prod_id . ', (SELECT name FROM products WHERE id = ' . $prod_id . '), ' . $prod_quantity . ', ' . $total_price . ')';
            }
            $result = mysqli_query( $con, $sql );
            if ( mysqli_affected_rows( $con ) ) { 
                $myArray[] = 'Product added';
            } else {
                $myArray[] = 'No change done';
            }
            break;
        case 'delete':
            /* Check first if there's a product in the basked with that ID */
            if ( isset( $_GET['prodId'] ) ) {
                $sql = 'DELETE FROM prdbasket WHERE prod_id=' . $_GET['prodId'];
                $result = mysqli_query( $con, $sql );
                if ( mysqli_affected_rows($con) ) { 
                    $myArray[] = 'Product deleted';
                } else {
                    $myArray[] = 'No product to delete';
                }
            }
            break;
    } 
}

echo json_encode( $myArray );
mysqli_close($con);

?>