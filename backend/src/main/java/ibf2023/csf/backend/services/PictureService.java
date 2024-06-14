package ibf2023.csf.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.amazonaws.services.s3.AmazonS3;

import ibf2023.csf.backend.repositories.ImageRepository;
import ibf2023.csf.backend.repositories.PictureRepository;

@Service
public class PictureService {

	@Autowired
	private ImageRepository imgRepo;

	@Autowired
	private PictureRepository picRepo;

	// TODO Task 5.1
	// You may change the method signature by adding parameters and/or the return type
	// You may throw any exception 
	public void save() {
	}
}
