class UserActivationView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, uid, token):
        protocol = 'https://' if request.is_secure() else 'http://'
        web_url = protocol + request.get_host()
        post_url = web_url + "/auth/users/activation/"
        post_data = {'uid': uid, 'token': token}
        requests.post(post_url, data=post_data)
        return redirect('http://localhost:3000/login')


class ProfileDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsOwnerProfileOrReadOnly]
    lookup_field = 'master'

    def get_object(self):
        obj, _ = Profile.objects.get_or_create(master_id=self.kwargs['master'])
        return obj


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


