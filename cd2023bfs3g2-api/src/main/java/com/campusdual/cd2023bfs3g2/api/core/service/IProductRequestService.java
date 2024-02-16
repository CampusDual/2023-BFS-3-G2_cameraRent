package com.campusdual.cd2023bfs3g2.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;

import java.util.List;
import java.util.Map;

public interface IProductRequestService {
    public EntityResult productRequestQuery(Map<String, Object> keyMap, List<String> attrList);
    public EntityResult productRequestInsert(Map<String, Object> attrMap);
    public EntityResult productRequestUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap);
    public EntityResult productRequestDelete(Map<String, Object> keyMap);
    public EntityResult myProductRequestQuery(Map<String, Object> keyMap, List<String> attrList);
    public EntityResult myProductRequestUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap);
    public EntityResult myProductRequestDelete(Map<String, Object> keyMap);
    public EntityResult myProductRequestEntryQuery(Map<String, Object> keyMap, List<String> attrList);
    public EntityResult rentBalanceQuery(Map<String, Object> keyMap, List<String> attrList);
    public EntityResult rentBalanceTotalQuery(Map<String, Object> keyMap, List<String> attrList);
}
