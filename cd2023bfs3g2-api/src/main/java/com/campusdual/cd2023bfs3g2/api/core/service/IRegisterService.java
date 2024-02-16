package com.campusdual.cd2023bfs3g2.api.core.service;


import com.ontimize.jee.common.dto.EntityResult;

import java.util.List;
import java.util.Map;


public interface IRegisterService {

	public EntityResult registerQuery(Map<String, Object> keyMap, List<String> attrList);
	public EntityResult registerInsert(Map<String, Object> attrMap);

}
