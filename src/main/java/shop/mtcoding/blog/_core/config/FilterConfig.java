package shop.mtcoding.blog._core.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import shop.mtcoding.blog._core.filter.CorsFilter;

@Configuration
public class FilterConfig {

    @Value("${allow.host}")
    private String host;

    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilterRegistrationBean() {
        FilterRegistrationBean<CorsFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new CorsFilter(host));
        registrationBean.addUrlPatterns("/*");
        registrationBean.setOrder(1); // 필터 순서를 설정하여 가장 먼저 실행되도록 합니다.
        return registrationBean;
    }
}