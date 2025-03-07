import UserService from "../../../hooks/services/UserService";
import { formatDate } from "../schemas/ProductValid";
import { sProduct } from "./ProductSignify"

const userService = new UserService();

export const getAllProducts = async (PageNumber = 1) => {
    try {
        const response = await userService.sendAjax(
            `/api/products?PageNumber=${PageNumber}`,
            "GET",
            null,
            true);
        if (response != null) {
            if (response.data?.value) {
                response.data.value = response.data.value.map(product => ({
                    ...product,
                    createdAt: formatDate(product.createdAt),
                    updatedAt: formatDate(product.updatedAt),
                }));
            }
            return response;
        } else {
            console.error(`Error: Received status ${response.error}`);
            return [];
        }
    } catch (error) {
        console.error("Error fetching products: ", error);
        return [];
    }
};


export const getProduct = async (productId) => {
    try {
        const response = await userService.sendAjax(`/api/products/product/${productId}`, "GET", null, true);
        if (response?.data) {
            return {
                ...response.data.value,
                createdAt: formatDate(response.data.value.createdAt),
                updatedAt: formatDate(response.data.value.updatedAt),
            };
        }
        return null;
    } catch (error) {
        console.error("Lỗi khi lấy thông tin sản phẩm: ", error);
        return null;
    }
};

export const updateProduct = async (productId, productData, fileImage) => {
    try {
        const response = await userService.sendAjax(
            `/api/products/${productId}`,
            "PUT",
            productData,
            true
        );
        //Clear thong tin singify
        sProduct.set((pre) => ([
            pre.value.id = "",
            pre.value.productName = "",
            pre.value.productBarcode = "",
            pre.value.productPrice = "",
            pre.value.status = "",
            pre.value.createdAt = "",
            pre.value.updatedAt = "",
        ]));
        //Parse thong tin
        productData.productName = <>{productData.productName}<span className="font-semibold text-green-500"> - Recently Created</span> </>

        //Gan thong tin signify
        sProduct.set((pre) => ([
            pre.value.id = productId,
            pre.value.productName = productData.productName,
            pre.value.productBarcode = productData.productBarcode,
            pre.value.productPrice = productData.productPrice,
            pre.value.status = productData.status,
            pre.value.createdAt = productData.createdAt,
            pre.value.updatedAt = productData.updatedAt,
        ]));

        //xu ly file
        if (fileImage != null) {
            await createProductImage(productId, fileImage);
        }
        userService.showToast(200, "Update Successfull");
        return response;
    } catch (error) {
        console.error("Lỗi khi cập nhật sản phẩm: ", error);
        return null;
    }
};

export const createProduct = async (productData, FormData) => {
    try {
        const response = await userService.sendAjax(
            `/api/products`,
            "POST",
            productData,
            true
        );
        if (FormData != null) {
            await createProductImage(response.data.value.id, FormData);
        }

        //Clear thong tin singify
        sProduct.set((pre) => ([
            pre.value.id = "",
            pre.value.productName = "",
            pre.value.productBarcode = "",
            pre.value.productPrice = "",
            pre.value.status = "",
            pre.value.createdAt = "",
            pre.value.updatedAt = "",
        ]));
        //parse thong tin signify
        response.data.value.productName = <>{response.data.value.productName}<span className="font-semibold text-green-500"> - Recently Created</span> </>
        response.data.value.createdAt = formatDate(response.data.value.createdAt);
        response.data.value.updatedAt = formatDate(response.data.value.updatedAt);
        //gan vao signify
        sProduct.set(response.data.value);



        userService.showToast(200, "Create Product Successfull");
        return response;
    } catch (error) {
        console.error("Lỗi khi tạo sản phẩm: ", error);
        return null;
    }
};

export const createProductImage = async (productId, FormData) => {
    console.log("check products id: ", productId);
    try {
        const response = await userService.sendAjax(
            `/api/products/${productId}/images`,
            "POST",
            FormData,
            true,
            true
        );
        return response;
    } catch (error) {
        console.error("Fail to upload image: ", error.message);
    }
}

export const searchProduct = async (params) => {
    try {
        const queryString = Object.keys(params)
            .filter(key => params[key])
            .map(key => `${key}=${encodeURIComponent(params[key])}`)
            .join("&");

        const url = `/api/products?${queryString}`;

        const response = await userService.sendAjax(url, "GET", null, true);

        if (response != null && response.data?.value) {
            response.data.value = response.data.value.map(product => ({
                ...product,
                createdAt: formatDate(product.createdAt),
                updatedAt: formatDate(product.updatedAt),
            }));
        }

        return response;
    } catch (error) {
        console.error("Error searching product:", error);
        throw error;
    }
};

export const getAllCategory = async () => {
    try {
        const response = await userService.sendAjax(
            "/api/product/categories?PageNumber=0&Fields=id%2C%20category",
            "GET",
            null,
            true);

        if (response != null) {
            return response;
        } else {
            console.error(`Error: Received status ${response.error}`);
            return null;
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};

export const getAllBrand = async () => {
    try {
        const response = await userService.sendAjax(
            `/api/brands?&PageSize=0&Fields=id%2C%20brandName`,
            "GET",
            null,
            true
        );

        if (response != null) {
            return response;
        } else {
            console.error(`Error: Received status ${response.error}`);
            return [];
        }
    } catch (error) {
        console.error("Error fetching brands: ", error);
        return null;
    }
};
