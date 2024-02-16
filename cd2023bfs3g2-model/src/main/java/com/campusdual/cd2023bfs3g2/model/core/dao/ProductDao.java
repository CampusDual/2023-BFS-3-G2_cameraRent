package com.campusdual.cd2023bfs3g2.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Lazy
@Repository(value = "ProductDao")
@ConfigurationFile(
        configurationFile = "dao/ProductDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties")
public class ProductDao extends OntimizeJdbcDaoSupport {

   public static final String ID = "id_product";
    public static final String NAME = "product_name";
    public static final String PASSWORD = "price";
    public static final String STATUS = "status";
    public static final String TYPE = "product_type";
    public static final String AVALIABLE = "avaliable";
    public static final String PHOTO = "main_photo";
    public static final String LOCATION = "plocation";
    public static final String USER = "tuser_user_";
    public static final String DETAILS = "pdetails";

}
