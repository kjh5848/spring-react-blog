package shop.mtcoding.blog._core.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.*;
import lombok.Getter;
import shop.mtcoding.blog._core.utils.JwtUtil;
import shop.mtcoding.blog.user.SessionUser;

import java.io.IOException;

@Getter
public class CorsFilter implements Filter {

    private String host;

    public CorsFilter(String host) {
        this.host = host;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse resp = (HttpServletResponse) response;

        // CORS 설정
        resp.setHeader("Access-Control-Allow-Origin", host);
        resp.setHeader("Access-Control-Allow-Methods", "*");
        resp.setHeader("Access-Control-Allow-Headers", "*");
        resp.setHeader("Access-Control-Expose-Headers", "*");

        // 프리플라이트 요청 처리
        if ("OPTIONS".equalsIgnoreCase(req.getMethod())) {
            resp.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        // JWT 토큰 처리
        String jwt = req.getHeader("Authorization");
        System.out.println("jwt = " + jwt);

        if (jwt != null && !jwt.trim().isEmpty()) {
            try {
                jwt = jwt.replace("Bearer ", "");
                SessionUser sessionUser = JwtUtil.verify(jwt);

                req.setAttribute("sessionUser", sessionUser);
            } catch (Exception e) {
                System.out.println("토큰 검증 실패: " + e.getMessage());
                resp.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
                return;
            }
        } else {
            System.out.println("Authorization 헤더가 없습니다.");
        }
        // 해당 헤더가 없으면 아래 7가지의 header값만 응답할 수 있다.
        // Cache-Control
        //Content-Language
        //Content-Length
        //Content-Type
        //Expires
        //Last-Modified
        //Pragma

        System.out.println("CORS 필터 작동");
        chain.doFilter(request, response);
    }

}