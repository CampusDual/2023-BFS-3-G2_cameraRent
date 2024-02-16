package com.campusdual.cd2023bfs3g2.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Lazy
@Repository(value = "ProductImageDao")
@ConfigurationFile(
        configurationFile = "dao/ProductImageDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties")
public class ProductImageDao extends OntimizeJdbcDaoSupport {

    public static final String ID = "id_image";
    public static final String ID_PRODUCT = "tproducts_id_product";
    public static final String IMG = "pimage";



}