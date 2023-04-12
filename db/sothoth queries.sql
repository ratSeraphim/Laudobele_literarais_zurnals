use sothothpress;

INSERT INTO accounts (username, email, password, role) VALUES ("coolname", "inbox@inbox.lv", "password", "owner");

INSERT INTO userinfo (account_id, display_name) VALUES (1, "The Writer");

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