package com.campusdual.cd2023bfs3g2.ws.core.rest;

import com.campusdual.cd2023bfs3g2.api.core.service.IProductService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/products")
public class ProductRestController extends ORestController<IProductService> {

    @Autowired
    private IProductService productSrv;

    @Override
    public IProductService getService() {
        return this.productSrv;
    }
}

