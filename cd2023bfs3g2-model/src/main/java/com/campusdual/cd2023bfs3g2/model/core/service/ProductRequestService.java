package com.campusdual.cd2023bfs3g2.model.core.service;

import com.campusdual.cd2023bfs3g2.api.core.service.IProductRequestService;
import com.campusdual.cd2023bfs3g2.model.core.dao.ProductRequestDao;
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
@Service("ProductRequestService")

public class ProductRequestService implements IProductRequestService {
    @Autowired
    private ProductRequestDao productRequestDao;
    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;
    @Override
    public EntityResult productRequestQuery(Map<String, Object> keyMap, List<String> attrList) {
        return this.daoHelper.query(productRequestDao, keyMap, attrList);
    }

    @Override
    public EntityResult productRequestInsert(Map<String, Object> attrMap) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        attrMap.put(ProductRequestDao.USER_, authentication.getName());
        return this.daoHelper.insert(productRequestDao, attrMap);
    }

    @Override
    public EntityResult productRequestUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) {
        return this.daoHelper.update(productRequestDao, attrMap, keyMap);
    }

    @Override
    public EntityResult productRequestDelete(Map<String, Object> keyMap) {
        return this.daoHelper.delete(this.productRequestDao, keyMap);
    }

    @Override
    public EntityResult myProductRequestQuery(Map<String, Object> keyMap, List<String> attrList) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        keyMap.put(ProductRequestDao.RUSER_, authentication.getName());
        return this.daoHelper.query(productRequestDao, keyMap, attrList,"myOutRents");
    }

    @Override
    public EntityResult myProductRequestUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) {
        return null;
    }

    @Override
    public EntityResult myProductRequestDelete(Map<String, Object> keyMap) {
        return null;
    }
    @Override
    public EntityResult myProductRequestEntryQuery(Map<String, Object> keyMap, List<String> attrList) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        keyMap.put(ProductRequestDao.PUSER_, authentication.getName());
        return this.daoHelper.query(productRequestDao, keyMap, attrList,"myOutRents");
    }

    @Override
    public EntityResult rentBalanceQuery(Map<String, Object> keyMap, List<String> attrList) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        keyMap.put(ProductRequestDao.PUSER_, authentication.getName());
        return this.daoHelper.query(productRequestDao, keyMap, attrList,"rentBalance");
    }

    @Override
    public EntityResult rentBalanceTotalQuery(Map<String, Object> keyMap, List<String> attrList) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        keyMap.put(ProductRequestDao.PUSER_, authentication.getName());
        return this.daoHelper.query(productRequestDao, keyMap, attrList,"rentBalanceTotal");
    }
}
