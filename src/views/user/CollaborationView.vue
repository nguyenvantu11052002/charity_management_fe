<template>
  <div class="flex flex-col items-center gap-4 py-20">
    <base-banner
      :title="'Hợp tác'"
      :content="'Hợp tác với chúng tôi để làm những điều tốt đẹp hơn'"
    ></base-banner>

    <section class="w-full max-w-screen-lg flex flex-col gap-10 mx-4 mt-10 px-4">
      <div class="gap-4 grid grid-cols-1 md:grid-cols-2">
        <img
          src="https://vietnamchildrensfund.com/wp-content/uploads/2023/12/vietnam-childrens-fund-17-1.jpg"
          class="object-cover rounded-lg w-full"
        />
        <div class="h-full gap-2 flex flex-col">
          <span class="text-pink-500 font-bold text-2xl">Giới thiệu</span>
          <article class="flex-1 md:line-clamp-6 lg:line-clamp-none text-gray-500">
            Tại trang web của chúng tôi, bạn có thể tạo chiến dịch gây quỹ trực tuyến để ủng hộ trẻ
            em và phụ nữ khó khăn tại Việt Nam. Bằng cách tham gia, bạn sẽ đóng góp trực tiếp vào
            việc cung cấp nguồn lực cần thiết và xây dựng một tương lai tốt đẹp hơn cho cộng đồng.
            Chúng tôi khuyến khích những hoạt động mang đến sự sáng tạo trong việc gây quỹ để hỗ trợ
            GiveWellVn.
            <br />
            Chúng tôi sẽ đồng hành cùng bạn trong quá trình lên kế hoạch và tổ chức các sự kiện gây
            quỹ. Không quan trọng bạn tham gia vào hoạt động gì và kết quả thu được ra sao, chúng
            tôi trân trọng những nỗ lực của bạn trong việc cùng chúng tôi cải thiện cuộc sống và
            sinh kế cho trẻ em và phụ nữ Việt Nam.
          </article>
        </div>
      </div>
      <div class="gap-4 grid grid-cols-1 md:grid-cols-2">
        <img
          src="https://vietnamchildrensfund.com/wp-content/uploads/2023/12/vietnam-childrens-fund-17-1.jpg"
          class="object-cover rounded-lg w-full md:order-2"
        />
        <div class="h-full max-h-80 gap-2 flex flex-col">
          <span class="text-pink-500 font-bold text-2xl">Hướng dẫn</span>
          <p class="flex-1 md:line-clamp-6 lg:line-clamp-none text text-gray-500">
            Bạn có thể tạo chiến dịch gây quỹ trực tuyến một cách dễ dàng và thuận tiện ngay tại
            trang web của chúng tôi. Bằng cách chia sẻ câu chuyện và mục tiêu gây quỹ của bạn, mời
            mọi người cùng tham gia đóng góp cho chiến dịch và chia sẻ thành tựu của chiến dịch tới
            cộng đồng sau khi chiến dịch hoàn thành, bạn đang góp phần lan tỏa thông điệp tích cực
            và cải thiện cuộc sống của trẻ em và phụ nữ khó khăn. Ngay bây giờ, chọn Tạo chiến dịch,
            làm theo hướng dẫn và liên hệ với chúng tôi bất cứ lúc nào nếu bạn cần hỗ trợ.
          </p>
        </div>
      </div>
    </section>
    <base-link
      :to="'user-create-campaign-route'"
      :title="'Tạo chiến dịch'"
      :defaultStyle="'bg-pink-500 hover:bg-pink-600 text-white flex justify-center '"
    ></base-link>
  </div>
</template>

<script setup>
import BaseLink from '@/components/BaseLink.vue'
import BaseBanner from '@/components/BaseBanner.vue'
</script>

<style>
</style>
