package ibf2023.csf.backend.repositories;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

@Repository
public class ImageRepository {

	@Autowired
	private AmazonS3 s3;

	// TODO Task 4.2
	// You may change the method signature by adding parameters and/or the  return type
	// You may throw any exception 
	public String save(MultipartFile file) throws IOException {
		final String bucketname = "csf";
		Map<String, String> userData = new HashMap<>();

		userData.put("dateUploaded", (new Date()).toString());
		userData.put("filename", file.getOriginalFilename());

		ObjectMetadata metadata = new ObjectMetadata();
		metadata.setContentLength(file.getSize());
		metadata.setContentType(file.getContentType());
		metadata.setUserMetadata(userData);

		String key = UUID.randomUUID().toString().substring(0,8);
		
		PutObjectRequest putReq = new PutObjectRequest(bucketname, key, file.getInputStream(),metadata);
		putReq = putReq.withCannedAcl(CannedAccessControlList.PublicRead);

		s3.putObject(putReq);

		return s3.getUrl(bucketname, key).toString();

	}
}

