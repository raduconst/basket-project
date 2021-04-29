CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ;

CREATE TABLE IF NOT EXISTS `prdbasket` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prod_id` int(11) NOT NULL,
  `prod_name` varchar(32) NOT NULL,
  `qty` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ;

INSERT INTO `products` (`name`, `description`, `price`, `stock`) VALUES
('Borsec 0.5L', 'Bottle of water', '1.00', 10),
('Borsec 2L', 'Bottle of water', '2.50', 15),
('Dona 1L', 'Milk', '5.50', 73),
('Toblerone', 'Swiss chocolate', '19.00', 32),
('Oreo', 'Great cookies', '3.40', 0),
('Pringles', 'Can of chips', '8.50', 58);