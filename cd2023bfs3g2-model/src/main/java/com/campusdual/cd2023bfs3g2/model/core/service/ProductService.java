package com.campusdual.cd2023bfs3g2.model.core.service;

import com.campusdual.cd2023bfs3g2.api.core.service.IProductService;
import com.campusdual.cd2023bfs3g2.model.core.dao.ProductDao;
import com.campusdual.cd2023bfs3g2.model.core.dao.ProductImageDao;
import com.campusdual.cd2023bfs3g2.model.core.dao.ProductStatusDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Lazy
@Service("ProductService")
public class ProductService implements IProductService {
    @Autowired
    private ProductDao productDao;
    @Autowired
    private ProductStatusDao productStatusDao;
    @Autowired
    private ProductImageDao imageDao;

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;
    @Override
    public EntityResult productQuery(Map<String, Object> keyMap, List<String> attrList) {
        return this.daoHelper.query(productDao, keyMap, attrList);
    }

    @Override
    public EntityResult productInsert(Map<String, Object> attrMap) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        attrMap.put(ProductDao.USER, authentication.getName());
        return this.daoHelper.insert(productDao, attrMap);
    }

    @Override
    public EntityResult productUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) {
        return this.daoHelper.update(productDao, attrMap, keyMap);
    }

    @Override
    public EntityResult productDelete(Map<String, Object> keyMap) {
        return this.daoHelper.delete(this.productDao, keyMap);
    }

    @Override
    public EntityResult myProductQuery(Map<String, Object> keyMap, List<String> attrList) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        keyMap.put(ProductDao.USER, authentication.getName());

        return this.daoHelper.query(productDao, keyMap, attrList);
    }
    @Override
    public EntityResult myProductDelete(Map<String, Object> keyMap) {
        return this.daoHelper.delete(this.productDao, keyMap);
    }

    @Override
    public EntityResult productStatusQuery(Map<String, Object> keyMap, List<String> attrList) {
        return this.daoHelper.query(productStatusDao, keyMap, attrList);
    }

    @Override
    public EntityResult productStatusInsert(Map<String, Object> attrMap) {
        return null;
    }

    @Override
    public EntityResult productStatusUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) {
        return null;
    }

    @Override
    public EntityResult productStatusDelete(Map<String, Object> keyMap) {
        return null;
    }

    @Override
    public EntityResult productImageQuery(Map<String, Object> keyMap, List<String> attrList) {
        return this.daoHelper.query(imageDao, keyMap, attrList);
    }

    @Override
    public EntityResult productImageInsert(Map<String, Object> attrMap) {
        return this.daoHelper.insert(imageDao, attrMap);
    }

    @Override
    public EntityResult productImageUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) {
        return this.daoHelper.update(imageDao, attrMap, keyMap);
    }

    @Override
    public EntityResult productImageDelete(Map<String, Object> keyMap) {
        return this.daoHelper.delete(imageDao, keyMap);
    }
}
