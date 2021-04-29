<?php
header("Content-Type:application/json");
header("Access-Control-Allow-Origin: *");
include "config/database.php";
$myArray = array();

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));

switch( $method ) {
	case 'GET':
		$sql = 'SELECT * FROM `products`';
		break;
}

$result = mysqli_query( $con, $sql );

if ( !$result ) {
	http_response_code( 404 );
	die( mysqli_error( $con ) );
}


while( $row = $result->fetch_array( MYSQLI_ASSOC ) ) {
	$myArray[] = $row;
}

echo json_encode( $myArray );

?>