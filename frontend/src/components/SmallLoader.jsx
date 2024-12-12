if (loading) {
    return (
      <Card className="w-full h-[80vh] flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin" />
      </Card>
    );
  }