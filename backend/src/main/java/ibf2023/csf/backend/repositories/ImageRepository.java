package ibf2023.csf.backend.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ImageRepository {

	@Autowired
	private MongoTemplate mongoTemplate;

	// TODO Task 4.1
	// You may change the method signature by adding parameters and/or the return type
	// You may throw any exception 
	public void save() {
		// IMPORTANT: Write the native mongo query in the comments above this method
	}
}

