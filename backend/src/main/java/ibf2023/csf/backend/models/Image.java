package ibf2023.csf.backend.models;

import java.util.Date;

public class Image {
    private String id;
    private Date date;
    private String title;
    private String comments;
    private String url;
    private long size;
    
    public Image(String id, Date date, String title, String comments, String url, long size) {
        this.id = id;
        this.date = date;
        this.title = title;
        this.comments = comments;
        this.url = url;
        this.size = size;
    }
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public Date getDate() {
        return date;
    }
    public void setDate(Date date) {
        this.date = date;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getComments() {
        return comments;
    }
    public void setComments(String comments) {
        this.comments = comments;
    }
    public String getUrl() {
        return url;
    }
    public void setUrl(String url) {
        this.url = url;
    }
    public long getSize() {
        return size;
    }
    public void setSize(long size) {
        this.size = size;
    }


    
}
