package ibf2023.csf.backend.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.amazonaws.services.s3.AmazonS3;

@Repository
public class PictureRepository {

	@Autowired
	private AmazonS3 s3;

	// TODO Task 4.2
	// You may change the method signature by adding parameters and/or the  return type
	// You may throw any exception 
	public void save() {
	}

}
