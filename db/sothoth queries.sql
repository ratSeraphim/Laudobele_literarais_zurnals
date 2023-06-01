use sothoth_db;


 DELIMITER $$
 CREATE PROCEDURE collectionInfo (IN colid INT)
BEGIN
	SELECT title, display_name, stories.story_id, userinfo.account_id
	FROM stories
	INNER JOIN story_collection
	ON stories.story_id = story_collection.story_id
	INNER JOIN userinfo
	ON userinfo.account_id = stories.account_id
	WHERE story_collection.collection_id =  colid;


	SELECT display_name, userinfo.account_id, account_collection.role
	FROM userinfo
	INNER JOIN account_collection
	ON userinfo.account_id = account_collection.account_id
	WHERE account_collection.collection_id =  colid
    ORDER BY account_collection.role ASC;
    
    
    SELECT collection_id, name, description
	FROM collections
	WHERE collections.collection_id =  colid;
END $$ 
 DELIMITER ;

 DELIMITER $$
 CREATE PROCEDURE accountCreations (IN acc_id INT)
BEGIN
	SELECT title, summary, date, story_id
	FROM stories
	WHERE stories.account_id =  acc_id;


	SELECT collections.collection_id, name, description
	FROM collections
	INNER JOIN account_collection
	ON collections.collection_id = account_collection.collection_id
	WHERE account_collection.account_id =  acc_id;
    
	SELECT content, date, post_id, story_id, collection_id
	FROM posts
	WHERE account_id =  acc_id;
    
    SELECT comments.content, comment_id, title, comments.date, comments.story_id
    FROM comments INNER JOIN stories
    ON comments.story_id = stories.story_id
    WHERE comments.account_id = acc_id;
END $$ 
 DELIMITER ;

INSERT INTO accounts (username, email, password, role, salt) VALUES ("testuser", "test@email.com", "76c768f7c9cf2bfde5bb50d6d5e2a61d4e303465269b120e9f5c9b5e458c2cd8", "user", "abafabe8c2f722ef");

INSERT INTO userinfo (account_id, display_name) VALUES (1, "The Tester");

INSERT INTO stories (title, content, date, summary, public, account_id) VALUES ("The Cabbage Story!",
 "There once was a story bout a man who had a real big nose and then he ate a lot of cabbages that only grew and grew in size each time someone took a look at them.
 Because they kept growing, they soon overtook his entire house and it was quite a plight because he hadn't even gone to the market to buy a lawnmower yet. 
 What would he do? Use shears? Those are for sheeps, not cabbages! This was quite a sad moment for his family, as he became trapped inside his house. 
 The cabbages only grew each time they looked at them and it was really really quick, too. Soon, the man suffocated, because the cabbages had crushed his house and himself. 
 Too many cabbages.. And not a single baby. Sad.", "2023-04-12", "Cabbage man and his sad cabbage story", 1, 1);
 
 INSERT INTO posts (content, date, account_id, story_id) VALUES ("The cabbage story was just recently updated. Check it out losers!", "2023-04-12", 1, 1);
 
 INSERT INTO collections (name, description) VALUES ("sad short stories", "Some sad stories lol");
 
 INSERT INTO story_collection VALUES (1, 1);
 
 INSERT INTO account_collection VALUES (1, 1);
 
 INSERT INTO comments (content, account_id, story_id, date) VALUES ("I hope you guys like this i worked very hard on it", 1, 1, "2023-04-12");
 