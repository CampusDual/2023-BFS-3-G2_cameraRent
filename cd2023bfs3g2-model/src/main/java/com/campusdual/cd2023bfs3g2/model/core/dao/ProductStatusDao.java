package com.campusdual.cd2023bfs3g2.model.core.dao;


import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;

@Lazy
@Repository(value = "ProductStatusDao")
@ConfigurationFile(
        configurationFile = "dao/ProductStatusDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties")
public class ProductStatusDao extends OntimizeJdbcDaoSupport {
    public static final String ID = "id";
    public static final String STATUS = "status";
}
