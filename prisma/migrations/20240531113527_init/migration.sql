-- CreateTable
CREATE TABLE `users` (
    `uid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `occupation` VARCHAR(191) NOT NULL,
    `join_date` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `oid` VARCHAR(191) NOT NULL,
    `uid` VARCHAR(191) NOT NULL,
    `order_date` VARCHAR(191) NOT NULL,
    `delivery_date` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `order_status` VARCHAR(191) NOT NULL,
    `payment_method` VARCHAR(191) NOT NULL,
    `discount_code` VARCHAR(191) NOT NULL,
    `shopping_cost` DOUBLE NOT NULL,
    `tracking_number` VARCHAR(191) NOT NULL,
    `customer_note` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`oid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `coupang_products` (
    `pid` DOUBLE NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `base_price` VARCHAR(191) NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `unit_price` VARCHAR(191) NOT NULL,
    `arrival` VARCHAR(191) NOT NULL,
    `rating` VARCHAR(191) NOT NULL,
    `reward` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`pid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `books` (
    `book_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `publisher` VARCHAR(191) NOT NULL,
    `discount` VARCHAR(191) NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `price_normal` VARCHAR(191) NOT NULL,
    `point` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL DEFAULT '',
    `review` VARCHAR(191) NOT NULL,
    `img` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`book_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
